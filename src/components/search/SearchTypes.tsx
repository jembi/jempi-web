import { Button, Grid } from '@mui/material'
import { Fragment } from 'react'

interface SearchTypesProps {
  to: string
  label: string
}

const SearchTypes: React.FC<SearchTypesProps> = ({ to, label }) => {
  return (
    <Fragment>
      <Grid item marginLeft={2}>
        <Button
          variant="outlined"
          sx={{ height: '42px', width: '172px' }}
          href={to}
        >
          {label}
        </Button>
      </Grid>
    </Fragment>
  )
}

export default SearchTypes
