import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SxProps,
  Theme
} from '@mui/material'

interface CustomSearchSelectFieldProps {
  index: number
  onChange: ((event: any) => void) | undefined
  fieldName: string
  options: any[]
  targetField: string
  title: string
  description?: string
  helperText?: string
  sx?: SxProps<Theme>
  fieldGroupIndex: number
}

const CustomSearchSelectField: React.FC<CustomSearchSelectFieldProps> = ({
  index,
  onChange,
  fieldName,
  options,
  targetField,
  title,
  description,
  helperText,
  sx = { width: 200 },
  fieldGroupIndex
}) => {
  return (
    <FormControl fullWidth sx={sx}>
      <InputLabel>{title}</InputLabel>
      <Select
        value={fieldName}
        label="Field"
        onChange={onChange}
        name={`fieldGroups[${fieldGroupIndex}].parameters[${index}].${targetField}`}
      >
        <MenuItem value="" disabled>
          <em>{description}</em>
        </MenuItem>

        {options.map((item, index) => {
          return (
            <MenuItem value={item.fieldName || item} key={index}>
              {item.fieldLabel || item}
            </MenuItem>
          )
        })}
      </Select>
      <FormHelperText>{helperText || ''}</FormHelperText>
    </FormControl>
  )
}

export default CustomSearchSelectField
