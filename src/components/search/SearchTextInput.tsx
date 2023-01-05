import { TextField } from '@mui/material'

interface SearchTextInputProps {
  value: string | Date
  onChange?: (e: React.ChangeEvent<any>) => void
  name: string
  label: string
}

const SearchTextInput: React.FC<SearchTextInputProps> = ({
  value,
  onChange,
  name,
  label
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
    />
  )
}

export default SearchTextInput
