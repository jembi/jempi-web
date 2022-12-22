import { TextField } from '@mui/material'
import { Fragment } from 'react'
interface SimpleSearchTextInput {
  textFieldValue: string | Date
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
  name: string
  label: string
}
const SearchTextInput = (prop: SimpleSearchTextInput) => {
  return (
    <Fragment>
      <TextField
        id="outlined-basic"
        label={prop.label}
        variant="outlined"
        size="small"
        value={prop.textFieldValue}
        onChange={prop.onChange}
        name={prop.name}
      />
    </Fragment>
  )
}

export default SearchTextInput
