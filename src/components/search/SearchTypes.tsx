import { Button, Grid } from '@mui/material'

interface SearchTypesProps {
  to: string
  label: string
}

const SearchTypes: React.FC<SearchTypesProps> = ({ to, label }) => {
  return (
    <Grid item marginLeft={2}>
      <Button
        variant="outlined"
        sx={{ height: '42px', width: '172px' }}
        href={to}
      >
        {label}
      </Button>
    </Grid>
  )
}

export default SearchTypes
