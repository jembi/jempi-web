import { Grid } from '@mui/material'
import { useState } from 'react'
import ToggleButtons from './ToggleButtons'

interface SearchFlagsProps {
  options: string[]
}

const SearchFlags: React.FC<SearchFlagsProps> = ({ options }) => {
  const [selectedButton, setSelectedButton] = useState<number>(1)

  const handleChange = (event: React.MouseEvent<HTMLElement>, value: any) => {
    setSelectedButton(value)
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
            borderColor: '#1976D2',
            color: '#1976D2',
            '&.Mui-selected, &.Mui-selected:hover': {
              color: 'white',
              backgroundColor: '#1976D2'
            }
          }}
          options={options}
        />
      </Grid>
    </Grid>
  )
}

export default SearchFlags
