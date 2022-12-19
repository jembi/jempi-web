import { Alert, AlertTitle, Container } from '@mui/material'
import { AxiosError } from 'axios'
import { FC } from 'react'

const ApiErrorMessage: FC<{ error: AxiosError }> = ({ error }) => {
  return (
    <Container>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error.message}
      </Alert>
    </Container>
  )
}

export default ApiErrorMessage
