import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Fragment } from 'react'

import ToggleThreeButtonType from '../../types/ToggleThreeButton'
//TODO: update to the correct prop type
const ToggleThreeButton = (prop: ToggleThreeButtonType) => {
  return (
    <Fragment>
      <ToggleButtonGroup
        value={prop.selectedButton}
        exclusive
        onChange={prop.handleChange}
        size={'small'}
        disabled={!prop.exactValue}
        id={prop.name}
      >
        <ToggleButton
          value={1}
          aria-label="left aligned"
          sx={prop.ToggleButtonStyle}
          name={prop.name}
        >
          <Typography id={prop.name}>{prop.button1Label}</Typography>
        </ToggleButton>
        <ToggleButton
          value={2}
          aria-label="centered"
          sx={prop.ToggleButtonStyle}
          name={prop.name}
        >
          <Typography id={prop.name}>{prop.button2Label}</Typography>
        </ToggleButton>
        <ToggleButton
          value={3}
          aria-label="right aligned"
          sx={prop.ToggleButtonStyle}
          name={prop.name}
        >
          <Typography id={prop.name}>{prop.button3Label}</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </Fragment>
  )
}

export default ToggleThreeButton
