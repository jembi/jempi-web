import './App.css'

import { CssBaseline, ThemeProvider } from '@mui/material'

import Shell from './components/shell/Shell'
import theme from './theme'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Shell />
    </ThemeProvider>
  )
}

export default App
