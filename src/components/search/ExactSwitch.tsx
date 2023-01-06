import { Stack, Switch, Typography } from '@mui/material'
import { useState } from 'react'

interface ExactSwitchProps {
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void
  name: string
  value: boolean
}

const ExactSwitch: React.FC<ExactSwitchProps> = ({ onChange, name, value }) => {
  const [checked, setChecked] = useState(value)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
    onChange && onChange(event, event.target.checked)
  }

  return (
    <Stack direction={'row'} alignItems="center">
      <Switch
        checked={checked}
        onChange={handleChange}
        value={value}
        name={name}
      />
      <Typography
        sx={{
          fontSize: '14px',
          color: value ? '#000000' : 'rgba(0, 0, 0, 0.3)',
          fontWeight: 800
        }}
      >
        Exact
      </Typography>
    </Stack>
  )
}

export default ExactSwitch
