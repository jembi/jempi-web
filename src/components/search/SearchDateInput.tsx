import { TextField } from '@mui/material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import moment, { Moment } from 'moment'
import { useState } from 'react'

export interface SearchDateInputProps {
  name: string
  value: string | Date
  label: string
  onChange?: (e: React.ChangeEvent<any>) => void
}

const SearchDateInput: React.FC<SearchDateInputProps> = ({
  name,
  value,
  label,
  onChange
}) => {
  const [dateValue, setDateValue] = useState<Moment | null>(
    value ? moment(value, 'DD/MM/YYYY') : moment()
  )
  const handleChange = (newValue: Moment | null) => {
    setDateValue(newValue)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DesktopDatePicker
        label={label}
        inputFormat="DD/MM/YYYY"
        value={dateValue}
        onChange={handleChange}
        renderInput={params => (
          <TextField
            {...params}
            name={name}
            variant="outlined"
            size="small"
            onChange={onChange}
            sx={{ width: '210px' }}
          />
        )}
      />
    </LocalizationProvider>
  )
}

export default SearchDateInput
