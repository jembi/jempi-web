import DeleteIcon from '@mui/icons-material/Delete'
import { Grid, IconButton, SelectChangeEvent, Typography } from '@mui/material'
import { useState } from 'react'
import { useAppConfig } from '../../hooks/useAppConfig'
import { DisplayField } from '../../types/Fields'
import { SearchParameter } from '../../types/SimpleSearch'
import SearchDateInput from './SearchDateInput'
import SearchSelectField from './SearchSelectField'
import SearchTextInput from './SearchTextInput'

interface SearchRowProps {
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

const SearchRow: React.FC<SearchRowProps> = ({
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

  const [fieldToSelect, setFieldToSelect] = useState<DisplayField | undefined>(
    undefined
  )
  const [matchType, setMatchType] = useState<string>('')

  const handleFieldNameChange = (event: SelectChangeEvent) => {
    const field = availableFields.find(
      obj => obj.fieldName === event.target.value
    )

    setFieldToSelect(field)
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
              fieldName={fieldToSelect ? fieldToSelect!.fieldName : ''}
              onChange={handleFieldNameChange}
              index={index}
              options={availableFields.map(value => ({
                value: value.fieldName,
                label: value.fieldLabel
              }))}
              title={'Select Type'}
              description={'Select Field Type'}
              sx={{ width: 220, mt: 0.4 }}
              name={`fieldName`}
              isCustomRow={isCustomRow}
              fieldGroupIndex={fieldGroupIndex}

            />
          </Grid>
        )}
        <Grid item>
          {(fieldToSelect && fieldToSelect?.fieldType === 'Date') ||
          field?.fieldType === 'Date' ? (
            <SearchDateInput
              label={
                isCustomRow
                  ? fieldToSelect?.fieldLabel || 'Select a field type'
                  : field!.fieldLabel
              }
              value={parameter.value}
              onChange={onChange}
              name={'value'}
              sx={{ width: isCustomRow ? 220 : 400 }}
              size={isCustomRow ? 'medium' : 'small'}
              setFieldValue={setFieldValue}
              isCustomRow={isCustomRow}
              index={index}
              fieldGroupIndex={fieldGroupIndex}
            />
          ) : (
            <SearchTextInput
              label={
                isCustomRow
                  ? fieldToSelect?.fieldLabel || 'Select a field type'
                  : field!.fieldLabel
              }
              value={parameter.value}
              onChange={onChange}
              name={'value'}
              sx={{ width: isCustomRow ? 220 : 400 }}
              size={isCustomRow ? 'medium' : 'small'}
              isCustomRow={isCustomRow}
              index={index}
              fieldGroupIndex={fieldGroupIndex}
              disabled={fieldToSelect?.fieldName ? false : true}
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
            name={'distance'}
            helperText={'Sets distance parameter 0-3'}
            fieldName={matchType}
            size={isCustomRow ? 'medium' : 'small'}
            isCustomRow={isCustomRow}
            fieldGroupIndex={fieldGroupIndex}
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

export default SearchRow