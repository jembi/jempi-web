import { Grid, Link, Stack, Typography } from '@mui/material'

const CustomSearchHeader = () => {
  return (
    <Grid item direction={'row'} justifyContent={'flex-start'} sx={{ mb: 3 }}>
      <Stack direction={'column'}>
        <Typography variant="h5">Customize Your Search Rules</Typography>
        <Typography variant="body2">
          <Link href={'/search/simple'}>Use simple search</Link>
        </Typography>
      </Stack>
    </Grid>
  )
}
export default CustomSearchHeader
