import { Grid } from '@mui/material'
import { DisplayField } from '../../types/Fields'
import { SearchParameter } from '../../types/SimpleSearch'
import SearchDateInput from './SearchDateInput'
import SearchDropdown from './SearchDropdown'
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

  return (
    <Grid
      item
      container
      direction="row"
      alignItems="center"
      width="fit-content"
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
          onChange={onChange}
          index={index}
          title={'Match Type'}
          description={'Select Match Type'}
          helperText = {'Sets distance parameter 0-3'}
          sx={{ width: 220, marginLeft: 2 , marginTop: 3 }}
        />
      </Grid>
    </Grid>
  )
}

export default SimpleSearchRow
