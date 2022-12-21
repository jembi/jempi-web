import { TextField } from '@mui/material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import moment, { Moment } from 'moment'
import { Fragment, useState } from 'react'
import {SimpleSearchDateInput} from '../../types/SimpleSearch'

const SearchDateInput = (prop: SimpleSearchDateInput) => {
  
  const [value, setValue] = useState<Moment | null>(
    moment(),
  );
  const handleChange = (newValue: Moment | null) => {
    setValue(newValue);
    prop.setFieldValue(prop.name, moment(newValue).format('DD/MM/YYYY'))
  };

  return (
    <Fragment>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DesktopDatePicker
          label={prop.label}
          inputFormat="DD/MM/YYYY"
          value={value}
          onChange={handleChange}
          renderInput={params => (
            <TextField {...params} variant="outlined" size="small" sx={{width: '210px'}}/>
          )}
        />
      </LocalizationProvider>
    </Fragment>
  )
}

export default SearchDateInput
