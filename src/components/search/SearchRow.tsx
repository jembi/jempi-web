import DeleteIcon from '@mui/icons-material/Delete'
import { Grid, IconButton, SelectChangeEvent, SxProps, Theme, Typography } from '@mui/material'
import { useState } from 'react'
import { useAppConfig } from '../../hooks/useAppConfig'
import { DisplayField } from '../../types/Fields'
import { SearchParameter } from '../../types/SimpleSearch'
import SearchDateInput from './SearchDateInput'
import SearchSelectField from './SearchSelectField'
import SearchTextInput from './SearchTextInput'

interface SimpleSearchRowProps {
  field?: DisplayField
  parameter: SearchParameter
  index: number
  onChange?: (e: React.ChangeEvent<any>) => void
  remove?: <T>(index: number) => T | undefined
  enableDelete?: boolean
  fieldGroupIndex?: number
  setFieldValue?: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void
  isCustomRow?: boolean
}

interface fieldStyleProp{
  sx: SxProps<Theme>
  size: "small" | "medium" | undefined
  name: string

}


const SimpleSearchRow: React.FC<SimpleSearchRowProps> = ({
  field,
  parameter,
  index,
  onChange,
  enableDelete = true,
  remove,
  fieldGroupIndex,
  setFieldValue,
  isCustomRow = false
}) => {
  const { availableFields } = useAppConfig()

  const options = [
    { value: 0, label: 'Exact' },
    { value: 1, label: 'Low Fuzziness' },
    { value: 2, label: 'Medium Fuzziness' },
    { value: 3, label: 'High Fuzziness' }
  ]

  const [fieldName, setFieldName] = useState<string>('')
  const [fieldLabel, setFieldLabel] = useState<string>('')

  const [matchType, setMatchType] = useState<string>('')

  const handleFieldNameChange = (event: SelectChangeEvent) => {
    const field = availableFields.find(
      obj => obj.fieldName === event.target.value
    )

    setFieldLabel(field!.fieldLabel)
    setFieldName(event.target.value)
    onChange && onChange(event as React.ChangeEvent<any>)
  }

  const handleStrictLevelChange = (event: React.ChangeEvent<any>) => {
    setMatchType(event.target.value)
    onChange && onChange(event)
  }

  return (
    <Grid item container direction={'column'}>
      {isCustomRow && index > 0 ? (
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
        sx={{ mb: isCustomRow ? 1 : 0, ml: isCustomRow ? 3 : 0 }}
        spacing={isCustomRow ? 1 : 0}
      >
        {isCustomRow && (
          <Grid item>
            <SearchSelectField
              fieldName={fieldName}
              onChange={handleFieldNameChange}
              index={index}
              options={availableFields}
              title={'Select Type'}
              description={'Select Field Type'}
              sx={{ width: 220, mt: 0.4 }}
              name={`$or[${fieldGroupIndex}].parameters[${index}].fieldName`}
            />
          </Grid>
        )}
        <Grid item>
          {fieldName === 'dob' || (field && field!.fieldType === 'Date') ? (
            <SearchDateInput
              label={
                isCustomRow
                  ? fieldLabel || 'Select a field type'
                  : field!.fieldLabel
              }
              value={parameter.value}
              onChange={onChange}
              name={
                isCustomRow
                  ? `$or[${fieldGroupIndex}].parameters[${index}].value`
                  : `parameters[${index}].value`
              }
              sx={{ width: isCustomRow ? 220 : 400 }}
              size={isCustomRow ? 'medium' : 'small'}
              setFieldValue={setFieldValue}
            />
          ) : (
            <SearchTextInput
              label={
                isCustomRow
                  ? fieldLabel || 'Select a field type'
                  : field!.fieldLabel
              }
              value={parameter.value}
              onChange={onChange}
              name={
                isCustomRow
                  ? `$or[${fieldGroupIndex}].parameters[${index}].value`
                  : `parameters[${index}].value`
              }
              sx={{ width: isCustomRow ? 220 : 400 }}
              size={isCustomRow ? 'medium' : 'small'}
            />
          )}
        </Grid>
        <Grid item>
          <SearchSelectField
            options={options}
            onChange={handleStrictLevelChange}
            index={index}
            title={'Match Type'}
            description={'Select Match Type'}
            sx={{ width: 220, ml: isCustomRow ? 0 : 2, mt: 3 }}
            name={
              isCustomRow
                ? `$or[${fieldGroupIndex}].parameters[${index}].distance`
                : `parameters[${index}].distance`
            }
            helperText={'Sets distance parameter 0-3'}
            fieldName={matchType}
            size={isCustomRow ? 'medium' : 'small'}
          />
        </Grid>
        {isCustomRow && (
          <Grid item minWidth={'48px'}>
            {enableDelete && (
              <IconButton onClick={() => remove && remove(index)}>
                <DeleteIcon />
              </IconButton>
            )}
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

export default SimpleSearchRow
