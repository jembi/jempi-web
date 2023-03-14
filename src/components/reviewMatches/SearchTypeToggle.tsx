import { Grid } from '@mui/material'
import ToggleButtons from 'components/search/ToggleButtons'
import { useState } from 'react'
import { ToggleOptionsProps } from 'types/SimpleSearch'

interface SearchTypeToggleProps {
  options: ToggleOptionsProps[]
  onChange: (searchType: string) => void
}

const SearchTypeToggle: React.FC<SearchTypeToggleProps> = ({
  options,
  onChange
}) => {
  const [selectedButton, setSelectedButton] = useState<string>('0')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedButton(event?.target.value)
    onChange(event?.target.value === '0' ? 'custom-search' : 'simple-search')
  }

  return (
    <Grid container direction={'row'} justifyContent={'center'} mt={3}>
      <Grid item>
        <ToggleButtons
          selectedButton={selectedButton}
          onChange={handleChange}
          sx={{
            width: '150px',
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

export default SearchTypeToggle
