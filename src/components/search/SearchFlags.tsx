import { Grid } from '@mui/material'
import { useState } from 'react'
import { SearchFlagsOptionsProps } from '../../types/SimpleSearch'
import ToggleButtons from './ToggleButtons'

interface SearchFlagsProps {
  options: SearchFlagsOptionsProps[]
  onChange: (isGoldenOnly: boolean) => void
}

const SearchFlags: React.FC<SearchFlagsProps> = ({ options, onChange }) => {
  const [selectedButton, setSelectedButton] = useState<string>('0')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedButton(event?.target.value)
    onChange(event?.target.value === '0')
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
