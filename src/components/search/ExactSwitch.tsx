import { Stack, Switch, Typography } from '@mui/material'
import { Fragment, useState } from 'react'
import SimpleSearchExactSwitch from '../../types/ExactSwitch'

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
            fontFamily: 'Roboto',
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
