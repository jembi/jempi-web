import { SxProps, TextField, Theme } from '@mui/material'

interface SearchTextInputProps {
  value: string | Date
  onChange?: (e: React.ChangeEvent<any>) => void
  name: string
  label: string
  disabled?: boolean
  sx: SxProps<Theme>
  size: 'small' | 'medium' | undefined
  fieldGroupIndex?: number
  index: number
  isCustomRow?: boolean
}

const SearchTextInput: React.FC<SearchTextInputProps> = ({
  value,
  onChange,
  name,
  label,
  disabled = false,
  sx = { width: 220 },
  size = 'small',
  index,
  fieldGroupIndex,
  isCustomRow
}) => {
  const fieldIdentifier = isCustomRow
    ? `$or[${fieldGroupIndex}].parameters[${index}].${name}`
    : `parameters[${index}].${name}`

  return (
    <TextField
      id="outlined-basic"
      label={label}
      variant="outlined"
      size={size}
      value={value}
      onChange={onChange}
      name={fieldIdentifier}
      sx={sx}
      disabled={disabled}
    />
  )
}

export default SearchTextInput
