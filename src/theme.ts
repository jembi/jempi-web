import { createTheme } from '@mui/material'
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    header: true
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    dgSubTitle: React.CSSProperties
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    dgSubTitle?: React.CSSProperties
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    dgSubTitle: true
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
    }
  },
  typography: {
    fontFamily: 'Roboto',
    h5: {
      color: 'rgba(0, 0, 0, 0.6)'
    },
    dgSubTitle: {
      fontFamily: 'Roboto',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '32px',
      letterSpacing: '1px',
      textAlign: 'left'
    }
  }
})

export default overrides
