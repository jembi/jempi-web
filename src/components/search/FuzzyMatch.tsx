import { Stack, Typography } from '@mui/material'
import { useState } from 'react'
import ToggleThreeButton from './ToggleThreeButton'
import SimpleSearchFuzzyMatch from '../../types/FuzzyMatch'

const FuzzyMatch = (prop: SimpleSearchFuzzyMatch) => {
  const [selectedButton, setSelectedButton] = useState<number>(1)

  const ToggleButtonStyle = () => ({
    width: '50px',
    '&.Mui-selected, &.Mui-selected:hover': {
      color: 'white',
      backgroundColor: prop.exactValue ? '#1976D2' : ''
    }
  })

  const handleChange = (event: React.MouseEvent<HTMLElement>, value: any) => {
    prop.setFieldValue(prop.name, value)
    setSelectedButton(value)
  }

  return (
    <Stack direction={'column'} alignItems="start">
      <Typography
        sx={{
          fontFamily: 'Roboto',
          fontSize: '14px',
          color: prop.exactValue ? '#000000' : 'rgba(0, 0, 0, 0.3)'
        }}
      >
        Fuzzy match
      </Typography>
      <ToggleThreeButton
        selectedButton={selectedButton}
        handleChange={handleChange}
        onChange={prop.onChange}
        distanceValue={prop.distanceValue}
        exactValue={prop.exactValue}
        ToggleButtonStyle={ToggleButtonStyle}
        button1Label={"1"}
        button2Label={"2"}
        button3Label={"3"}
        name={prop.name}
      />
      <Typography
        sx={{
          fontFamily: 'Roboto',
          fontSize: '13px',
          color: prop.exactValue ? '#000000' : 'rgba(0, 0, 0, 0.3)'
        }}
      >
        Distance parameter
      </Typography>
    </Stack>
  )
}

export default FuzzyMatch
