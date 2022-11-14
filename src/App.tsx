import './App.css'

import { CssBaseline, ThemeProvider, Typography } from '@mui/material'
import { ReactLocation, Route, Router } from '@tanstack/react-location'

import Dashboard from './components/dashboard/Dashboard'
import MatchDetails from './components/reviewMatches/MatchDetails'
import ReviewMatches from './components/reviewMatches/ReviewMatches'
import Search from './components/search/Search'
import Shell from './components/shell/Shell'
import ApiClient from './services/ApiClient'
import theme from './theme'

const location = new ReactLocation()

const routes: Route[] = [
  { path: '/', element: <Dashboard /> },
  {
    path: '/review-matches',
    element: <ReviewMatches />,
    loader: async () => {
      return { matches: await ApiClient.getMatches() }
    }
  },
  {
    path: '/match/:matchId',
    element: <MatchDetails />
  },
  { path: '/search', element: <Search /> },
  { element: <Typography variant="h1">NOPE</Typography> }
]

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router location={location} routes={routes}>
        <Shell />
      </Router>
    </ThemeProvider>
  )
}

export default App
