import { TextField } from '@mui/material'

interface SearchTextInputProps {
  value: string | Date
  onChange?: (e: React.ChangeEvent<any>) => void
  name: string
  label: string
  disabled?: boolean
}

const SearchTextInput: React.FC<SearchTextInputProps> = ({
  value,
  onChange,
  name,
  label,
  disabled = false
}) => {
  return (
    <TextField
      id="outlined-basic"
      label={label}
      variant="outlined"
      size="small"
      value={value}
      onChange={onChange}
      name={name}
      sx={{ width: 400 }}
      disabled={disabled}
    />
  )
}

export default SearchTextInput
