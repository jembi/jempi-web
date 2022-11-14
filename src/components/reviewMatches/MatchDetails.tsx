import { Box, Breadcrumbs, Link, Typography } from '@mui/material'

const MatchDetails = () => {
  return (
    <Box>
      <Typography variant="h5">Patient Matches Detail</Typography>
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/review-matches/">
          Matches
        </Link>
        <Typography color="text.primary">Patient name goes here</Typography>
      </Breadcrumbs>
    </Box>
  )
}

export default MatchDetails
