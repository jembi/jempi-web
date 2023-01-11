export interface User {
  id: number
  email: string
  username: string
  firstName: string
  lastName: string
  provider: 'local' | 'keycloak'
}

export type OAuthParams = {
  code: string
  state: string
  session_state: string
}
