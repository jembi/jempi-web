import {
  FormControl,
  FormHelperText, InputLabel,
  MenuItem,
  Select, SxProps,
  Theme
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { useState } from 'react'

interface SearchDropdownProps {
  index: number
  onChange: (e: React.ChangeEvent<any>) => void
  title: string
  description?: string
  options: string[]
  helperText?: string
  sx?: SxProps<Theme>
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  index,
  onChange,
  options,
  title,
  description,
  helperText,
  sx = { width: 200 }
}) => {
  const [selectedField, setSelectedField] = useState<string>('')

  function handleChange(event: SelectChangeEvent) {
    setSelectedField(event.target.value)
    onChange && onChange(event as React.ChangeEvent<any>)
  }
  return (

      <FormControl fullWidth size={'small'} sx={sx}>
        <InputLabel>{title}</InputLabel>
        <Select
          value={selectedField}
          label="Field"
          onChange={handleChange}
          name={`parameters[${index}].distance`}
        >
          <MenuItem value="" disabled>
            <em>{description}</em>
          </MenuItem>

          {options.map((item, index) => {
            return (
              <MenuItem value={index} key={index}>
                {item}
              </MenuItem>
            )
          })}
        </Select>
        <FormHelperText>{helperText ? helperText : ''}</FormHelperText>
      </FormControl>
      

  )
}

export default SearchDropdown
