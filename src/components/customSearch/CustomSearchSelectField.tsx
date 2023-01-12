import {
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'
import { useAppConfig } from '../../hooks/useAppConfig'
import { SelectChangeEvent } from '@mui/material/Select'

interface CustomSearchSelectFieldProps {
  index: number
  onChange: (event: SelectChangeEvent) => void
  fieldName: string
}

const CustomSearchSelectField: React.FC<CustomSearchSelectFieldProps> = ({index, onChange, fieldName}) => {
  const { availableFields } = useAppConfig()

  return (
    <FormControl fullWidth size={'small'} sx={{ width: 400 }}>
      <InputLabel>Select Field</InputLabel>
      <Select
        value={fieldName}
        label="Field"
        onChange={onChange}
        name={`parameters[${index}].fieldName`}
      >
        <MenuItem value="" disabled>
          <em>Select Field Type</em>
        </MenuItem>

        {availableFields.map((field, index) => {
          return (
            <MenuItem value={field.fieldName} key={index}>
              {field.fieldLabel}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

export default CustomSearchSelectField
