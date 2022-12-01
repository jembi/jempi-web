import './App.css'

import { CssBaseline, ThemeProvider, Typography } from '@mui/material'
import { ReactLocation, Route, Router } from '@tanstack/react-location'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import Dashboard from './components/dashboard/Dashboard'
import MatchDetails from './components/reviewMatches/MatchDetails'
import ReviewMatches from './components/reviewMatches/ReviewMatches'
import Search from './components/search/Search'
import Shell from './components/shell/Shell'
import theme from './theme'
import { SnackbarProvider } from 'notistack'

const location = new ReactLocation()
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
    
    }
  }
})

const routes: Route[] = [
  { path: '/', element: <Dashboard /> },
  {
    path: '/review-matches',
    element: <ReviewMatches />
  },
  {
    path: '/match-details',
    element: <MatchDetails />
  },
  { path: '/search', element: <Search /> },
  { element: <Typography variant="h1">NOPE</Typography> }
]

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Router location={location} routes={routes}>
          <SnackbarProvider
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <Shell />
          </SnackbarProvider>
        </Router>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
