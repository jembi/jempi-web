import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Search as SearchIcon
} from '@mui/icons-material'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import NavigationMenu from './NavigationMenu'

const barColour =
  'linear-gradient(90.05deg, #8BF280 -4.51%, #3B826B -4.5%, #58AB73 99.95%)'

const NavigationBar = () => {
  return (
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
        <NavigationMenu />
      </Toolbar>
      <Box
        sx={{
          background: barColour,
          height: 12
        }}
      ></Box>
    </AppBar>
  )
}

export default NavigationBar
