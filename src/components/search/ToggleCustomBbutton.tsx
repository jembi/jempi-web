import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Fragment } from 'react'
import { ToggleCustomBbuttonType } from '../../types/SimpleSearch'

const ToggleCustomBbutton = (prop: ToggleCustomBbuttonType) => {
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
        {prop.range.map((label: string, index: number) => {
          let value = index + 1
          return (
            <ToggleButton
              value={value}
              aria-label="left aligned"
              sx={prop.ToggleButtonStyle}
              name={prop.name}
              key={index}
            >
              <Typography id={prop.name}>{label}</Typography>
            </ToggleButton>
          )
        })}
      </ToggleButtonGroup>
    </Fragment>
  )
}

export default ToggleCustomBbutton
