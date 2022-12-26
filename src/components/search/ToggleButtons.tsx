import {
  SxProps,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material'

interface ToggleButtonsProps {
  selectedButton: number
  name?: string
  onChange: (event: React.MouseEvent<HTMLElement>, value: any) => void
  options: Array<string | number>
  sx: SxProps<Theme>
  disabled?: boolean
}

const ToggleButtons: React.FC<ToggleButtonsProps> = ({
  selectedButton,
  name,
  onChange,
  options,
  sx,
  disabled = false
}) => {
  return (
    <ToggleButtonGroup
      value={selectedButton}
      exclusive
      onChange={onChange}
      size={'small'}
      disabled={disabled}
      id={name}
    >
      {options.map(value => {
        return (
          <ToggleButton
            value={value}
            aria-label="left aligned"
            sx={sx}
            name={name}
            key={value}
          >
            <Typography id={name}>{value}</Typography>
          </ToggleButton>
        )
      })}
    </ToggleButtonGroup>
  )
}

export default ToggleButtons
