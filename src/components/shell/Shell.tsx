import { Box, Toolbar } from '@mui/material'

import { Outlet } from '@tanstack/react-location'
import ErrorBoundary from '../error/ErrorBoundary'
import NavigationBar from './NavigationBar'

const Shell = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <NavigationBar />
      <Box
        component="main"
        sx={{
          p: 6,
          width: '100%'
        }}
      >
        <Toolbar />
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </Box>
    </Box>
  )
}

export default Shell
