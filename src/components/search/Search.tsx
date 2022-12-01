import {
  Breadcrumbs,
  Container,
  Link,
  Typography,
  Grid,
  Button,
  Box,
  TextField,
  Slider
} from '@mui/material'
import { Stack } from '@mui/system'
import { useState } from 'react'

import SearchInput from './SearchInput.'

const Search = () => {
  const [nationalIdSearchStrictLevel, setNationalIdSearchStrictLevel] = useState(0)

  function getNationalIdSearchStrictLevel(value: number) {
    setNationalIdSearchStrictLevel(value)
    return `${value}`
  }
  return (
    <Container
      sx={{
        ml: 0,
        mr: 0
      }}
      maxWidth={false}
    >
      <Grid container direction={'column'}>
        <Grid item container direction={'row'}>
          <Grid item lg={6}>
            <Typography variant="h5">Simple Search</Typography>
            <Breadcrumbs>
              <Link underline="hover" color="inherit" href="/search">
                Search
              </Link>
              <Typography color="text.primary">Simple</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item lg={6}>
            <Grid container direction={'row'} justifyContent={'flex-end'}>
              <Grid item>
                <Button
                  variant="outlined"
                  sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                >
                  GOLDEN RECORDS
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  sx={{
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    boxShadow: 0
                  }}
                >
                  PATIENT RECORDS
                </Button>
              </Grid>
              <Grid item marginLeft={2}>
                <Button variant="outlined">CUSTOM SEARCH</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box
          sx={{
            width: '100%',
            borderRadius: '4px',
            boxShadow: '0px 0px 0px 1px #E0E0E0',
            background: '#FFFFFF',
            mt: 3,
            padding: 2
          }}
        >
          <Grid container direction={'column'} justifyContent={'center'}>
            <Grid item sx={{ ml: 4 }}>
              <Grid container direction={'row'}>
                <Grid xs={4} />
                <Grid item>
                  <Typography
                    sx={{
                      fontFamily: 'Roboto',
                      fontStyle: 'normal',
                      fontSize: '24px',
                      color: 'rgba(0, 0, 0, 0.6)'
                    }}
                  >
                    Search Records
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ mb: 2, ml: 4 }}>
              <Grid container direction={'row'}>
                <Grid xs={4} />
                <Grid item>
                  <Typography
                    sx={{
                      fontFamily: 'Roboto',
                      fontStyle: 'normal',
                      fontSize: '14px',
                      color: '#1976D2'
                    }}
                  >
                    Use custom search
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <SearchInput label={"National ID"} strictLevel={nationalIdSearchStrictLevel} setStrictLevel={getNationalIdSearchStrictLevel}/>
          </Grid>
        </Box>
      </Grid>
    </Container>
  )
}

export default Search
