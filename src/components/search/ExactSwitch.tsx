import { Stack, Switch, Typography } from '@mui/material'
import { useState } from 'react'

interface ExactSwitchProps {
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void
  name: string
  exactValue: boolean
}

const ExactSwitch: React.FC<ExactSwitchProps> = ({
  onChange,
  name,
  exactValue
}) => {
  const [checked, setChecked] = useState(true)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
    onChange && onChange(event, event.target.checked)
  }

  return (
    <Stack direction={'row'} alignItems="center">
      <Switch
        checked={checked}
        onChange={handleChange}
        value={exactValue}
        name={name}
      />
      <Typography
        sx={{
          fontSize: '14px',
          color: exactValue ? '#000000' : 'rgba(0, 0, 0, 0.3)',
          fontWeight: 800
        }}
      >
        Exact
      </Typography>
    </Stack>
  )
}

export default ExactSwitch
