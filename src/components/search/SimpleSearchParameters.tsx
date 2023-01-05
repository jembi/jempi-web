import { Grid } from '@mui/material'
import { DisplayField } from '../../types/Fields'
import { SearchParameter } from '../../types/SimpleSearch'
import ExactSwitch from './ExactSwitch'
import FuzzyMatch from './FuzzyMatch'
import SearchDateInput from './SearchDateInput'
import SearchTextInput from './SearchTextInput'

interface SimpleSearchParameterProps {
  field: DisplayField
  parameter: SearchParameter
  index: number
  onChange?: (e: React.ChangeEvent<any>) => void
}

const SimpleSearchParameter: React.FC<SimpleSearchParameterProps> = ({
  field,
  parameter,
  index,
  onChange
}) => {
  return (
    <Grid
      item
      container
      direction="row"
      alignItems="center"
      width="fit-content"
      sx={{ mb: 1 }}
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
    </Grid>
  )
}

export default SimpleSearchParameter
