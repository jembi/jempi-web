import { Stack, Switch, Typography } from '@mui/material'
import { Fragment, useState } from 'react'
interface SimpleSearchExactSwitch {
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
  name: string
  exactValue: boolean
}
const ExactSwitch = (prop: SimpleSearchExactSwitch) => {
  const [checked, setChecked] = useState(true)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
    prop.onChange!(event)
  }

  return (
    <Fragment>
      <Stack direction={'row'} alignItems="center">
        <Switch
          checked={checked}
          onChange={handleChange}
          value={prop.exactValue}
          name={prop.name}
        />
        <Typography
          sx={{
            fontSize: '14px',
            color: prop.exactValue ? '#000000' : 'rgba(0, 0, 0, 0.3)',
            fontWeight: 800
          }}
        >
          Exact
        </Typography>
      </Stack>
    </Fragment>
  )
}

export default ExactSwitch
