import DeleteIcon from '@mui/icons-material/Delete'
import { Grid, IconButton, Typography } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { useState } from 'react'
import { useAppConfig } from '../../hooks/useAppConfig'
import { SearchParameter } from '../../types/SimpleSearch'
import SearchDateInput from '../search/SearchDateInput'
import SearchSelectField from '../search/SearchSelectField'
import SearchTextInput from '../search/SearchTextInput'

interface CustomSearchRowProps {
  parameter: SearchParameter
  index: number
  onChange?: (e: React.ChangeEvent<any>) => void
  remove: <T>(index: number) => T | undefined
  enableDelete?: boolean
  enableCondition?: boolean
  fieldGroupIndex: number
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}

const CustomSearchRow: React.FC<CustomSearchRowProps> = ({
  parameter,
  index,
  onChange,
  enableDelete = true,
  remove,
  fieldGroupIndex,
  setFieldValue
}) => {
  const { availableFields } = useAppConfig()

  const options = [
    { value: 0, label: 'Exact' },
    { value: 1, label: 'Low Fuzziness'},
    { value: 2, label: 'Medium Fuzziness'},
    { value: 3, label: 'High Fuzziness'}
  ]

  const [fieldName, setFieldName] = useState<string>('')
  const [fieldLabel, setFieldLabel] = useState<string | undefined>(
    '' || undefined
  )
  const [matchType, setMatchType] = useState<string>('')

  function handleFieldNameChange(event: SelectChangeEvent) {
    const field = availableFields.find(
      obj => obj.fieldName === event.target.value
    )
    setFieldLabel(field?.fieldLabel)
    setFieldName(event.target.value)
    onChange && onChange(event as React.ChangeEvent<any>)
  }

  function handleStrictLevelChange(event: React.ChangeEvent<any>) {

    setMatchType(event.target.value)
    onChange && onChange(event)

  }

  return (
    <Grid item container direction={'column'}>
      {index > 0 ? (
        <Grid item container direction={'row'} justifyContent={'center'}>
          <Typography>And</Typography>
        </Grid>
      ) : null}

      <Grid
        item
        container
        direction="row"
        alignItems="center"
        width="fit-content"
        sx={{ mb: 1, ml: 3 }}
        spacing={1}
      >
        <Grid item>
          <SearchSelectField
            fieldName={fieldName}
            onChange={handleFieldNameChange}
            index={index}
            options={availableFields}
            title={'Select Type'}
            description={'Select Field Type'}
            sx={{ width: 220 }}
            name={`$or[${fieldGroupIndex}].parameters[${index}].fieldName`}

          />
        </Grid>
        <Grid item>
          {fieldName === 'dob' ? (
            <SearchDateInput
              label={fieldLabel || 'Select a field type'}
              value={parameter?.value}
              onChange={onChange}
              name={`$or[${fieldGroupIndex}].parameters[${index}].value`}
              sx={{ width: 220 }}
              size="medium"
              setFieldValue={setFieldValue}
            />
          ) : (
            <SearchTextInput
              label={fieldLabel || 'Select a field type'}
              value={parameter?.value}
              onChange={onChange}
              name={`$or[${fieldGroupIndex}].parameters[${index}].value`}
              disabled={!fieldName}
              sx={{ width: 220 }}
              size="medium"
            />
          )}
        </Grid>
        <Grid item>
          <SearchSelectField
            fieldName={matchType}
            onChange={handleStrictLevelChange}
            index={index}
            options={options}
            title={'Match Type'}
            description={'Select Match Type'}
            helperText={'Sets distance parameter 0-3'}
            sx={{ width: 220, marginTop: 3 }}
            name={`$or[${fieldGroupIndex}].parameters[${index}].distance`}

          />
        </Grid>
        <Grid item minWidth={'48px'}>
          {enableDelete && (
            <IconButton onClick={() => remove(index)}>
              <DeleteIcon />
            </IconButton>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CustomSearchRow
