import DeleteIcon from '@mui/icons-material/Delete'
import {
  Grid,
  IconButton
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { useState } from 'react'
import { useAppConfig } from '../../hooks/useAppConfig'
import { CustomSearchParameters } from '../../types/SimpleSearch'
import ExactSwitch from '../search/ExactSwitch'
import FuzzyMatch from '../search/FuzzyMatch'
import SearchDateInput from '../search/SearchDateInput'
import SearchTextInput from '../search/SearchTextInput'
import CustomSearchSelectField from './CustomSearchSelectField'
import SelectCondition from './SelectCondition'

interface CustomSearchRowProps {
  parameter: CustomSearchParameters
  index: number
  onChange?: (e: React.ChangeEvent<any>) => void
  remove: <T>(index: number) => T | undefined
  enableDelete?: boolean
  enableCondition?: boolean
}

const CustomSearchRow: React.FC<CustomSearchRowProps> = ({
  parameter,
  index,
  onChange,
  enableCondition = true,
  enableDelete = true,
  remove
}) => {
  const { availableFields } = useAppConfig()

  const [fieldName, setFieldName] = useState<string>('')
  const [fieldLabel, setFieldLabel] = useState<string | undefined>(
    '' || undefined
  )

  function handleChange(event: SelectChangeEvent) {
    const field = availableFields.find(
      obj => obj.fieldName == event.target.value
    )
    setFieldLabel(field?.fieldLabel)
    setFieldName(event.target.value)
    onChange && onChange(event as React.ChangeEvent<any>)
  }

  return (
    <Grid
      item
      container
      direction="row"
      alignItems="center"
      width="fit-content"
      sx={{ mb: 1 }}
      spacing={1}
    >
      <Grid item minWidth={'156px'}>
        {enableCondition ? (
          <SelectCondition
            onChange={onChange}
            name={`parameters[${index}].condition`}
            value={parameter.condition}
          />
        ) : null}
      </Grid>

      <Grid item>
        <CustomSearchSelectField
          fieldName={fieldName}
          onChange={handleChange}
          index={index}
        />
      </Grid>
      <Grid item>
        {fieldName === 'dob' ? (
          <SearchDateInput
            label={fieldLabel || 'Select a field type'}
            value={parameter.value}
            onChange={onChange}
            name={`parameters[${index}].value`}
          />
        ) : (
          <SearchTextInput
            label={fieldLabel || 'Select a field type'}
            value={parameter.value}
            onChange={onChange}
            name={`parameters[${index}].value`}
            disabled={!fieldName}
          />
        )}
      </Grid>
      <Grid item sx={{ ml: 2, mr: 4 }}>
        <ExactSwitch
          onChange={onChange}
          value={parameter.exact}
          name={`parameters[${index}].exact`}
        />
      </Grid>
      <Grid item>
        <FuzzyMatch
          disabled={!!parameter.exact}
          onChange={onChange}
          name={`parameters[${index}].distance`}
          value={parameter.distance}
        />
      </Grid>
      <Grid item>
        {enableDelete && (
          <IconButton onClick={() => remove(index)}>
            <DeleteIcon />
          </IconButton>
        )}
      </Grid>
    </Grid>
  )
}

export default CustomSearchRow
