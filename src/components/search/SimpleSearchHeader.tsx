import { Grid, Link, Stack, Typography } from '@mui/material'
import { FC } from 'react'

const SimpleSearchHeader: FC<{ isGoldenOnly: boolean }> = ({
  isGoldenOnly
}) => {
  return (
    <Grid item container direction="column" width="fit-content">
      <Grid item>
        <Stack direction={'row'} spacing={0.5}>
          <Typography variant="h5">Search</Typography>
          <Typography
            variant="h5"
            sx={
              isGoldenOnly
                ? { color: '#FBC02D', fontWeight: 700 }
                : { fontWeight: 700 }
            }
          >
            {isGoldenOnly ? 'Golden' : 'Patient'}
          </Typography>
          <Typography variant="h5" sx={{ color: theme => theme.typography.h5 }}>
            Records
          </Typography>
        </Stack>
      </Grid>
      <Grid item sx={{ mb: 1 }}>
        <Stack direction={'row'} spacing={0.5}>
          <Typography variant="body2">
            Find info fast with these fixed fields or make your own search rules
            with
          </Typography>
          <Typography variant="body2">
            <Link href={'/search/custom'}>Custom Search</Link>
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default SimpleSearchHeader
