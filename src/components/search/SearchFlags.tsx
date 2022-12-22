import { Grid } from '@mui/material'
import {useState } from 'react'
import SearchTypes from './SearchTypes'
import ToggleThreeButton from './ToggleCustomButton'

interface searchFlagsProps {
  range: string[]
  to: string
  label: string
}

const SearchFlags: React.FC<searchFlagsProps> = ({ range, to, label }) => {
  const [selectedButton, setSelectedButton] = useState<number>(1)
  const ToggleButtonStyle = () => ({
    width: '129px',
    height: '42px',
    borderColor: '#1976D2',
    color: '#1976D2',
    '&.Mui-selected, &.Mui-selected:hover': {
      color: 'white',
      backgroundColor: '#1976D2'
    }
  })

  const handleChange = (event: React.MouseEvent<HTMLElement>, value: any) => {
    setSelectedButton(value)
  }

  return (
    <Grid container direction={'row'} justifyContent={'flex-end'}>
      <Grid item>
        <ToggleThreeButton
          selectedButton={selectedButton}
          handleChange={handleChange}
          exactValue={true}
          ToggleButtonStyle={ToggleButtonStyle}
          range={range}
        />
      </Grid>
      <SearchTypes to={to} label={label} />
    </Grid>
  )
}

export default SearchFlags
