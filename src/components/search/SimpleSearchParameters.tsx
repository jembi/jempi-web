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
    <Grid item sx={{ mb: 1 }}>
      <Grid
        container
        direction={'row'}
        justifyContent={'center'}
        alignItems={'center'}
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
        <Grid item sx={{ ml: 0.5 }}>
          <Grid item sx={{ mr: 2 }}>
            <ExactSwitch
              onChange={onChange}
              value={parameter.exact}
              name={`parameters[${index}].exact`}
            />
          </Grid>
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
    </Grid>
  )
}

export default SimpleSearchParameter
