import { createTheme } from '@mui/material'

const overrides = {
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          background: 'white'
        }
      }
    }
  }
}

export default createTheme(overrides)
