import { useLocation, useNavigate } from '@tanstack/react-location'
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useSnackbar } from 'notistack'
import React, { useEffect, useRef } from 'react'

import ApiErrorMessage from '../components/error/ApiErrorMessage'
import ApiClient from '../services/ApiClient'
import keycloak from '../services/keycloak'
import { OAuthParams, User } from '../types/User'
import { parseQuery } from '../utils/misc'

export interface AuthContextValue {
  user: User | undefined
  isAuthenticated: boolean
  setUser: (data: User | undefined) => void
  logout: () => void
  signInWithKeyCloak: () => void
  refetchUser: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<User, Error>>
  error: Error | null
}

const AuthContext = React.createContext<AuthContextValue | null>(null)
AuthContext.displayName = 'AuthContext'

export interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const queryClient = useQueryClient()
  const location = useLocation()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const oauthRef = useRef<OAuthParams | null>(null)
  const key = 'auth-user'
  const currentUrl = window.location.href

  const {
    data: user,
    error,
    refetch
  } = useQuery<User, AxiosError<unknown, any>>({
    queryKey: [key],
    queryFn: async () => {
      return await ApiClient.getCurrentUser()
    },
    retry: false
  })

  const { refetch: logout } = useQuery({
    queryKey: ['logout'],
    queryFn: async () => {
      return await ApiClient.logout()
    },
    onSuccess() {
      queryClient.clear()
      navigate({ to: '/login' })
    },
    refetchOnWindowFocus: false,
    enabled: false
  })

  const { mutate: validateOAuth } = useMutation({
    mutationFn: ApiClient.validateOAuth,
    onSuccess(response) {
      enqueueSnackbar(`Successfully logged in using KeyCloak`, {
        variant: 'success'
      })
      setUser(response.user)
      navigate({ to: '/' })
    },
    onError(err) {
      enqueueSnackbar(`Unable to login using KeyCloak`, {
        variant: 'error'
      })
      console.error('Unable to validate OAuth params', err)
    }
  })

  const setUser = (data: User | undefined) =>
    queryClient.setQueryData([key], data)

  const signInWithKeyCloak = () => {
    keycloak.init({
      onLoad: 'login-required',
      redirectUri: currentUrl,
      checkLoginIframe: false
    })
  }

  useEffect(() => {
    const currentLocation = location.current
    if (
      !oauthRef.current &&
      currentLocation.pathname === '/login' &&
      currentLocation.hash
    ) {
      const params = parseQuery(currentLocation.hash) as OAuthParams
      oauthRef.current = params
      validateOAuth(params)
    }
  }, [validateOAuth])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        error,
        setUser,
        refetchUser: refetch,
        logout,
        signInWithKeyCloak
      }}
    >
      {error && <ApiErrorMessage error={error} />}
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error(`useAuth must be used within an AuthProvider`)
  }
  return context
}
