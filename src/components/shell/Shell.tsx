import {
  AccountCircle as AccountCircleIcon,
  Home,
  People as PeopleIcon,
  Search as SearchIcon,
  UploadFile as UploadFileIcon
} from '@mui/icons-material'
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material'

import { Outlet } from '@tanstack/react-location'
import ErrorBoundary from '../error/ErrorBoundary'

const barColour =
  'linear-gradient(90.05deg, #8BF280 -4.51%, #3B826B -4.5%, #58AB73 99.95%)'

const Shell = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar sx={{ order: 0 }}>
          <Box
            sx={{
              display: 'flex',
              mr: 4
            }}
          >
            <Typography variant="h6" sx={{ color: '#FFC400' }}>
              Je
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: theme => theme.palette.text.primary }}
            >
              MPI
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Button
              href="/"
              startIcon={<Home />}
              sx={{ color: theme => theme.palette.text.primary }}
            >
              Home
            </Button>
            <Button
              href="/search"
              startIcon={<SearchIcon />}
              sx={{ color: theme => theme.palette.text.primary }}
            >
              Search
            </Button>
            <Button
              href="/review-matches"
              startIcon={<PeopleIcon />}
              sx={{ color: theme => theme.palette.text.primary }}
            >
              Matches
            </Button>
            <Button
              href="/import"
              startIcon={<UploadFileIcon />}
              sx={{ color: theme => theme.palette.text.primary }}
            >
              Import
            </Button>
          </Box>
          <IconButton size="large" edge="end">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
        <Box
          sx={{
            background: barColour,
            height: 12
          }}
        ></Box>
      </AppBar>
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
