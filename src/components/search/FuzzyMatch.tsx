import { Stack, Typography } from '@mui/material'
import { useState } from 'react'
import ToggleThreeButton from './ToggleCustomButton'

interface SimpleSearchFuzzyMatch {
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
  name: string
  exactValue: boolean
  distanceValue: number
  setFieldValue: Function
}

const FuzzyMatch = (prop: SimpleSearchFuzzyMatch) => {
  const [selectedButton, setSelectedButton] = useState<number>(1)

  let range = new Array("1", "2", "3")

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
        range={range}
        name={prop.name}
      />
      <Typography
        sx={{
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
