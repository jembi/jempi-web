import {
  Breadcrumbs,
  Container,
  Link,
  Typography,
  Grid,
  Button,
  Box,
  TextField,
  Slider,
  Stack
} from '@mui/material'
import SearchParameters from '../../types/SearchParameters'

const SearchInput = (prop: SearchParameters) => {
  return (
    <>
      <Grid item sx={{ mb: 2 }}>
        <Grid container direction={'row'}>
          <Grid
            item
            container
            direction={'row'}
            xs={6}
            justifyContent={'flex-end'}
          >
            <TextField
              id="outlined-basic"
              label="National ID"
              variant="outlined"
            />
          </Grid>
          <Grid
            item
            container
            direction={'column'}
            xs={4}
            sx={{ ml: 3, mt: 1 }}
          >
            <Grid item>
              <Stack spacing={2} direction={'row'} alignItems="center">
                <Typography
                  sx={{
                    fontFamily: 'Roboto',
                    fontSize: '14px',
                    color:
                      prop.strictLevel > 0 ? 'rgba(0, 0, 0, 0.3)' : '#000000',
                    fontWeight: 800
                  }}
                >
                  Exact
                </Typography>
                <Slider
                  aria-label="Temperature"
                  defaultValue={0}
                  getAriaValueText={prop.setStrictLevel}
                  valueLabelDisplay="on"
                  step={1}
                  marks
                  min={0}
                  max={10}
                  sx={{
                    width: '100%',
                    color:
                      prop.strictLevel > 0 ? 'primary' : 'rgba(0, 0, 0, 0.42)'
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: 'Roboto',
                    fontSize: '14px',
                    color:
                      prop.strictLevel == 0 ? 'rgba(0, 0, 0, 0.3)' : '#000000',
                    fontWeight: 800
                  }}
                >
                  Fuzzy
                </Typography>
              </Stack>
            </Grid>
            <Grid item container direction={'row'} justifyContent={'center'}>
              <Typography
                sx={{
                  fontFamily: 'Roboto',
                  fontSize: '14px',
                  fontWeight: 400,
                  color:
                    prop.strictLevel == 0 ? 'rgba(0, 0, 0, 0.3)' : '#000000'
                }}
              >
                Distance Parameter
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default SearchInput
