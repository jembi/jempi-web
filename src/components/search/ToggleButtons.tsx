import {
  SxProps,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material'
import { useRef, useState } from 'react'

export const triggerInputChange = (node: HTMLInputElement, value = '') => {
  // only process the change on elements we know have a value setter in their constructor
  // @ts-ignore
  const setValue = Object.getOwnPropertyDescriptor(node.__proto__, 'value').set
  const event = new Event('input', { bubbles: true })
  // @ts-ignore
  setValue.call(node, value)
  node.dispatchEvent(event)
}

interface ToggleButtonsProps {
  selectedButton: number
  name?: string
  onChange?: (e: React.ChangeEvent<any>) => void
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
  const [selected, setSelected] = useState(selectedButton)
  const ref = useRef<HTMLInputElement>(null)

  const handleToggle = (
    _e: React.MouseEvent<HTMLElement, MouseEvent>,
    value: any
  ) => {
    if (value && ref.current) {
      setSelected(value)
      triggerInputChange(ref.current, value)
    }
  }

  return (
    <>
      <ToggleButtonGroup
        value={selected}
        onChange={handleToggle}
        exclusive
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
              key={value}
            >
              <Typography id={name}>{value}</Typography>
            </ToggleButton>
          )
        })}
      </ToggleButtonGroup>
      <input
        ref={ref}
        name={name}
        onChange={onChange}
        style={{ display: 'none' }}
      />
    </>
  )
}

export default ToggleButtons
