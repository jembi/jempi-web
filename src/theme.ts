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
          style: () => ({
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
    },
    MuiCard: {
      styleOverrides: {
        root: () => ({
          marginTop: '33px',
          background: '#FFFFFF',
          boxShadow: '0px 0px 0px 1px #E0E0E0',
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        })
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          width: '130px',
          height: '42px',
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.main,
          '&.Mui-selected, &.Mui-selected:hover': {
            color: 'white',
            backgroundColor: theme.palette.primary.main
          }
        })
      }
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
