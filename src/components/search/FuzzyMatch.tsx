import { Stack, Typography } from '@mui/material'
import { useState } from 'react'
import ToggleThreeButton from './ToggleCustomButton'

interface FuzzyMatchProps {
  onChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined
  name: string
  exactValue: boolean
  distanceValue: number
  setFieldValue: Function
}

const FuzzyMatch: React.FC<FuzzyMatchProps> = ({
  onChange,
  name,
  exactValue,
  distanceValue,
  setFieldValue
}) => {
  const [selectedButton, setSelectedButton] = useState<number>(1)

  let range = new Array('1', '2', '3')

  const ToggleButtonStyle = () => ({
    width: '50px',
    '&.Mui-selected, &.Mui-selected:hover': {
      color: 'white',
      backgroundColor: exactValue ? '#1976D2' : ''
    }
  })

  const handleChange = (event: React.MouseEvent<HTMLElement>, value: any) => {
    setFieldValue(name, value)
    setSelectedButton(value)
  }

  return (
    <Stack direction={'column'} alignItems="start">
      <Typography
        sx={{
          fontSize: '14px',
          color: exactValue ? '#000000' : 'rgba(0, 0, 0, 0.3)'
        }}
      >
        Fuzzy match
      </Typography>
      <ToggleThreeButton
        selectedButton={selectedButton}
        handleChange={handleChange}
        onChange={onChange}
        distanceValue={distanceValue}
        exactValue={exactValue}
        ToggleButtonStyle={ToggleButtonStyle}
        range={range}
        name={name}
      />
      <Typography
        sx={{
          fontSize: '13px',
          color: exactValue ? '#000000' : 'rgba(0, 0, 0, 0.3)'
        }}
      >
        Distance parameter
      </Typography>
    </Stack>
  )
}

export default FuzzyMatch
