import { createTheme } from '@mui/material'
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    header: true
  }
}

const overrides = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          background: 'white'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.className === 'Appbar' && {
            color: theme.palette.text.primary
          })
        })
      },
      variants: [
        {
          props: { variant: 'header' },
          style: ({ theme }) => ({
            maxWidth: 'sm',
            color: 'white',
            backgroundColor: theme.palette.primary.main,
            '&:hover': { backgroundColor: theme.palette.primary.dark }
          })
        },
        {
          props: { variant: 'contained' },
          style: ({ theme }) => ({
            backgroundColor: '#274263',
            color: 'white',
            '&:hover': { backgroundColor: '#375982' },
            maxWidth: 'sm'
          })
        },
        {
          props: { variant: 'outlined' },
          style: ({ theme }) => ({
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            maxWidth: 'sm'
          })
        }
      ]
    }
  },
  typography: {
    fontFamily: 'Roboto',
    h5: {
      color: 'rgba(0, 0, 0, 0.6)'
    }
  }
})

export default overrides
