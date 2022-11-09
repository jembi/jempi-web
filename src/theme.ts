import { createTheme } from '@mui/material'

const overrides = {
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          background:
            'linear-gradient(90.05deg, #8BF280 -4.51%, #58AB73 -4.51%, #3B826B 99.95%)'
        }
      }
    }
  }
}

export default createTheme(overrides)
