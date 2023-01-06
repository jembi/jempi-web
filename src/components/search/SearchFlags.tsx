import { Grid } from '@mui/material'
import { useState } from 'react'
import ToggleButtons from './ToggleButtons'

interface SearchFlagsProps {
  options: string[]
}

const SearchFlags: React.FC<SearchFlagsProps> = ({ options }) => {
  const [selectedButton, setSelectedButton] = useState<number>(1)

  const handleChange = (event: React.ChangeEvent<any>) => {
    setSelectedButton(event?.target.value)
  }

  return (
    <Grid container direction={'row'} justifyContent={'flex-end'}>
      <Grid item>
        <ToggleButtons
          selectedButton={selectedButton}
          onChange={handleChange}
          sx={{
            width: '129px',
            height: '42px',
            borderColor: theme => theme.palette.primary.main,
            color: theme => theme.palette.primary.main,
            '&.Mui-selected, &.Mui-selected:hover': {
              color: 'white',
              backgroundColor: theme => theme.palette.primary.main
            }
          }}
          options={options}
        />
      </Grid>
    </Grid>
  )
}

export default SearchFlags
