import { Button, Grid } from '@mui/material'
import { Fragment } from 'react'

interface searchTypesButton {
  to: string
  label: string
}
const SearchTypes = (prop: searchTypesButton) => {
  return (
    <Fragment>
      <Grid item marginLeft={2}>
        <Button
          variant="outlined"
          sx={{ height: '42px', width: '172px' }}
          href={prop.to}
        >
          {prop.label}
        </Button>
      </Grid>
    </Fragment>
  )
}

export default SearchTypes
