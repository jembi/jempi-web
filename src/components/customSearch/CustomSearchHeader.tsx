import { Grid, Link, Stack, Typography } from '@mui/material'

const CustomSearchHeader = () => {
  return (
    <Grid item container direction="row" justifyContent="center" width="100%">
      <Grid
        item
        container
        width={'756px'}
        direction={'row'}
        justifyContent={'flex-start'}
        sx={{ mt: 1, mb: 3 }}
      >
        <Stack direction={'column'} spacing={1}>
          <Typography variant="h5">Custom Your Search Rules</Typography>
          <Typography variant="body2">
            <Link href={'/search/simple'}>Use simple search</Link>
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  )
}
export default CustomSearchHeader
