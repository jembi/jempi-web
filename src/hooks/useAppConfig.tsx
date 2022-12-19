import { useMatch, useMatchRoute } from '@tanstack/react-location'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import React, { useCallback, useMemo } from 'react'
import Loading from '../components/common/Loading'
import ApiErrorMessage from '../components/error/ApiErrorMessage'
import ApiClient from '../services/ApiClient'
import { FieldGroup, Fields } from '../types/Fields'
import PatientRecord from '../types/PatientRecord'

export interface AppConfigContextValue {
  availableFields: Fields
  getFieldsByGroup: (group: FieldGroup) => Fields
  getPatientName: (patient: PatientRecord) => string
}

const AppConfigContext = React.createContext<AppConfigContextValue | null>(null)
AppConfigContext.displayName = 'AppConfigContext'

export interface AppConfigProviderProps {
  children: React.ReactNode
}

export const AppConfigProvider = ({
  children
}: AppConfigProviderProps): JSX.Element => {
  const {
    data: fields,
    error,
    isLoading,
    isError
  } = useQuery<Fields, AxiosError>({
    queryKey: ['fields'],
    queryFn: () => ApiClient.getFields(),
    refetchOnWindowFocus: false
  })
  const matchRoute = useMatchRoute()
  const { pathname } = useMatch()

  const availableFields = useMemo(() => {
    return (fields || []).filter(({ scope }) =>
      scope.some(path => matchRoute({ to: path }))
    )
  }, [fields, pathname])

  const getFieldsByGroup = useCallback(
    (groupName: FieldGroup) => {
      return availableFields.filter(({ groups }) => groups.includes(groupName))
    },
    [availableFields]
  )

  const getPatientName = useCallback(
    (patient: PatientRecord) => {
      return getFieldsByGroup('name')
        .map(({ fieldName }) => {
          return fieldName in patient ? patient[fieldName] : null
        })
        .filter(v => !!v)
        .join(' ')
    },
    [getFieldsByGroup]
  )

  if (isLoading) {
    return <Loading />
  }

  if (isError || !fields) {
    return <ApiErrorMessage error={error} />
  }

  return (
    <AppConfigContext.Provider
      value={{
        availableFields,
        getFieldsByGroup,
        getPatientName
      }}
    >
      {children}
    </AppConfigContext.Provider>
  )
}

export const useAppConfig = () => {
  const context = React.useContext(AppConfigContext)
  if (!context) {
    throw new Error(`useAppConfig must be used within an AppConfigProvider`)
  }
  return context
}
