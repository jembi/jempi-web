export const config = {
  isDev: process.env.NODE_ENV === 'production',
  apiUrl:
    process.env.REACT_APP_JEMPI_BASE_URL || 'http://localhost:50000/JeMPI',
  shouldMockBackend: process.env.REACT_APP_MOCK_BACKEND === 'true',
  KeyCloakUrl: process.env.REACT_APP_KC_FRONTEND_URL || 'http://localhost:9088',
  KeyCloakRealm: process.env.REACT_APP_KC_REALM_NAME || 'platform-realm',
  KeyCloakClientId: process.env.REACT_APP_KC_JEMPI_CLIENT_ID || 'jempi-oauth'
}
