import { createTheme } from '@mui/material'

const overrides = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          background: 'white'
        }
      }
    }
  }, 
  typography: {
    fontFamily: 'Roboto',
  }
})

export default overrides
