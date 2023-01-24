import { Grid } from '@mui/material'
import { useState } from 'react'
import { DisplayField } from '../../types/Fields'
import { SearchParameter } from '../../types/SimpleSearch'
import SearchDateInput from './SearchDateInput'
import SearchDropdown from './SearchSelectField'
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
    'Exact',
    'Low Fuzziness',
    'Medium Fuzziness',
    'High Fuzziness'
  ]

  const [matchType, setMatchType] = useState<string>('')

  function handleStrictLevelChange(event: React.ChangeEvent<any>) {
    setMatchType(event.target.value)

    switch (event.target.value) {
      case 'exact':
        event.target.value = 0
        break
      case 'Low Fuzziness':
        event.target.value = 1
        break
      case 'Medium Fuzziness':
        event.target.value = 2
        break
      case 'High Fuzziness':
        event.target.value = 3
        break
      default:
        event.target.value = 0
    }

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
        <SearchDropdown
          options={options}
          onChange={handleStrictLevelChange}
          index={index}
          title={'Match Type'}
          description={'Select Match Type'}
          sx={{ width: 220, ml: 2, mt: 0.5 }}
          name={`parameters[${index}].distance`}
          fieldName={matchType}
        />
      </Grid>
    </Grid>
  )
}

export default SimpleSearchRow
