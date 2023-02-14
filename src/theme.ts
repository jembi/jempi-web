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
          ...(ownerState.variant === 'contained' && {
            backgroundColor: '#274263',
            color: 'white',
            '&:hover': { backgroundColor: '#375982' }
          }),
          ...(ownerState.variant === 'outlined' && {
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            height: '42px',
            width: '175px'
          }),
          ...(ownerState.className === 'mediumSizeButton' && {
            height: '36px'
          }),
          ...(ownerState.className === 'cancelButton' && {
            height: '36px',
            width: '85px'
          })
        })
      },
      variants: [
        {
          props: { variant: 'header' },
          style: ({ theme }) => ({
            height: '36px',
            width: '152px',
            color: 'white',
            backgroundColor: theme.palette.primary.main,
            '&:hover': { backgroundColor: theme.palette.primary.dark }
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
