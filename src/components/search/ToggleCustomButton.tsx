import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Fragment } from 'react'
import { SxProps, Theme } from "@mui/material"
interface ToggleCustomButtonType {
  selectedButton: number
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
  name?: string
  handleChange(value: any, event: React.MouseEvent<HTMLElement>): void
  range: string[]
  distanceValue?: number
  ToggleButtonStyle: SxProps<Theme>
  exactValue?: boolean

}
const ToggleCustomButton = (prop: ToggleCustomButtonType) => {
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

export default ToggleCustomButton
