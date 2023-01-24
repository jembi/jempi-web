import { Grid } from '@mui/material'
import { useState } from 'react'
import { DisplayField } from '../../types/Fields'
import { SearchParameter } from '../../types/SimpleSearch'
import SearchDateInput from './SearchDateInput'
import SearchSelectField from './SearchSelectField'
import SearchTextInput from './SearchTextInput'

interface SimpleSearchRowProps {
  field: DisplayField
  parameter: SearchParameter
  index: number
  onChange: (e: React.ChangeEvent<any>) => void
}

const SimpleSearchRow: React.FC<SimpleSearchRowProps> = ({
  field,
  parameter,
  index,
  onChange
}) => {
  
  const options = [
    { value: 0, label: 'Exact' },
    { value: 1, label: 'Low Fuzziness'},
    { value: 2, label: 'Medium Fuzziness'},
    { value: 3, label: 'High Fuzziness'}
  ]

  const [matchType, setMatchType] = useState<string>('')

  const handleStrictLevelChange = (event: React.ChangeEvent<any>) => {
    setMatchType(event.target.value)
    onChange && onChange(event)
  }

  return (
    <Grid
      item
      container
      direction="row"
      alignItems="center"
      width="fit-content"
      sx={{ mb: 3 }}
    >
      <Grid item>
        {field.fieldType === 'Date' ? (
          <SearchDateInput
            label={field.fieldLabel}
            value={parameter.value}
            onChange={onChange}
            name={`parameters[${index}].value`}
          />
        ) : (
          <SearchTextInput
            label={field.fieldLabel}
            value={parameter.value}
            onChange={onChange}
            name={`parameters[${index}].value`}
          />
        )}
      </Grid>
      <Grid>
        <SearchSelectField
          options={options}
          onChange={handleStrictLevelChange}
          index={index}
          title={'Match Type'}
          description={'Select Match Type'}
          sx={{ width: 220, ml: 2, mt: 0.5 }}
          name={`parameters[${index}].distance`}
          fieldName={matchType}
          size={'small'}
        />
      </Grid>
    </Grid>
  )
}

export default SimpleSearchRow
