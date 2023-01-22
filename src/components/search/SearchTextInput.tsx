import { SxProps, TextField, Theme } from '@mui/material'
import { StringifyOptions } from 'querystring'

interface SearchTextInputProps {
  value: string | Date
  onChange?: (e: React.ChangeEvent<any>) => void
  name: string
  label: string
  disabled?: boolean
  sx: SxProps<Theme>
  size: 'small' | 'medium' | undefined
}

const SearchTextInput: React.FC<SearchTextInputProps> = ({
  value,
  onChange,
  name,
  label,
  disabled = false,
  sx = { width: 220 },
  size = 'small'
}) => {
  return (
    <TextField
      id="outlined-basic"
      label={label}
      variant="outlined"
      size={size}
      value={value}
      onChange={onChange}
      name={name}
      sx={sx}
      disabled={disabled}
    />
  )
}

export default SearchTextInput
