import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Fragment } from 'react'
import { SxProps, Theme } from '@mui/material'
interface ToggleCustomButtonProps {
  selectedButton: number
  onChange?:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined
  name?: string
  handleChange(value: any, event: React.MouseEvent<HTMLElement>): void
  range: string[]
  distanceValue?: number
  ToggleButtonStyle: SxProps<Theme>
  exactValue?: boolean
}

const ToggleCustomButton: React.FC<ToggleCustomButtonProps> = ({
  selectedButton,
  onChange,
  name,
  handleChange,
  range,
  distanceValue,
  ToggleButtonStyle,
  exactValue
}) => {
  return (
    <Fragment>
      <ToggleButtonGroup
        value={selectedButton}
        exclusive
        onChange={handleChange}
        size={'small'}
        disabled={!exactValue}
        id={name}
      >
        {range.map((label: string, index: number) => {
          let value = index + 1
          return (
            <ToggleButton
              value={value}
              aria-label="left aligned"
              sx={ToggleButtonStyle}
              name={name}
              key={index}
            >
              <Typography id={name}>{label}</Typography>
            </ToggleButton>
          )
        })}
      </ToggleButtonGroup>
    </Fragment>
  )
}

export default ToggleCustomButton
