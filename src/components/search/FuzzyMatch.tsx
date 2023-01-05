import { Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { range } from '../../utils/misc'
import ToggleButtons from './ToggleButtons'

interface FuzzyMatchProps {
  onChange?: (event: React.ChangeEvent<any>, value: any) => void
  name: string
  value: number
  disabled: boolean
}

const FuzzyMatch: React.FC<FuzzyMatchProps> = ({
  onChange,
  name,
  value,
  disabled
}) => {
  const [selectedButton, setSelectedButton] = useState<number>(value || 1)

  const handleChange = (event: React.ChangeEvent<any>) => {
    setSelectedButton(event.target.value)
    onChange && onChange(event, event.target.value)
  }

  return (
    <Stack direction={'column'} alignItems="start">
      <Typography
        sx={{
          fontSize: '14px',
          color: !disabled ? '#000000' : 'rgba(0, 0, 0, 0.3)'
        }}
      >
        Fuzzy match
      </Typography>
      <ToggleButtons
        selectedButton={selectedButton}
        onChange={handleChange}
        disabled={disabled}
        sx={{
          width: '50px',
          '&.Mui-selected, &.Mui-selected:hover': {
            color: 'white',
            backgroundColor: !disabled ? '#1976D2' : ''
          }
        }}
        options={range(1, 3)}
        name={name}
      />
      <Typography
        sx={{
          fontSize: '13px',
          color: !disabled ? '#000000' : 'rgba(0, 0, 0, 0.3)'
        }}
      >
        Distance parameter
      </Typography>
    </Stack>
  )
}

export default FuzzyMatch
