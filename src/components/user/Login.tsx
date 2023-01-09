import { Person } from '@mui/icons-material'
import { Button, Container } from '@mui/material'
import { useAuth } from '../../hooks/useAuth'

import PageHeader from '../shell/PageHeader'

const Login = () => {
  const { signInWithKeyCloak } = useAuth()

  return (
    <Container maxWidth="xl">
      <PageHeader
        title={'Login'}
        breadcrumbs={[
          {
            icon: <Person />,
            title: 'Login'
          }
        ]}
      />
      <Button
        startIcon={<Person />}
        variant="outlined"
        sx={{
          borderColor: theme => theme.palette.primary.main
        }}
        onClick={signInWithKeyCloak}
      >
        Sign-In with KeyCloak
      </Button>
    </Container>
  )
}

export default Login
