import {
  AccountCircle as AccountCircleIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Search as SearchIcon
} from '@mui/icons-material'
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Button
} from '@mui/material'

import { Outlet } from '@tanstack/react-location'
import { ReactLocationDevtools } from '@tanstack/react-location-devtools'

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
              1
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: theme => theme.palette.text.primary }}
            >
              Record
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Button
              href="/"
              startIcon={<DashboardIcon />}
              sx={{ color: theme => theme.palette.text.primary }}
            >
              Dashboard
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
          </Box>
          <IconButton size="large" edge="end" color="inherit">
            <AccountCircleIcon sx={{color: "grey"}} />
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
          p: 3,
          width: '100%'
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
      <ReactLocationDevtools position="bottom-right" />
    </Box>
  )
}

export default Shell
