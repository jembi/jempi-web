import { Grid } from '@mui/material'
import ToggleButtons from 'components/search/ToggleButtons'
import { useState } from 'react'
import { ToggleButtonOptions } from 'types/SimpleSearch'

interface SearchTypeToggleProps {
  options: ToggleButtonOptions[]
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
          options={options}
        />
      </Grid>
    </Grid>
  )
}

export default SearchTypeToggle
