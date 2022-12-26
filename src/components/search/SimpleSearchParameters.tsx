import { Grid } from '@mui/material'
import ExactSwitch from './ExactSwitch'
import FuzzyMatch from './FuzzyMatch'
import SearchDateInput from './SearchDateInput'
import SearchTextInput from './SearchTextInput'

interface SimpleSearchParametersProps {
  label: string
  fieldAttribute: string
  exactAttribute: string
  distanceAttribute: string
  onChange?: (event: React.ChangeEvent<any>, value: any) => void
  textFieldValue: string | Date
  exactValue: boolean
  distanceValue: number
  setFieldValue: Function
}

const SimpleSearchParameters: React.FC<SimpleSearchParametersProps> = ({
  label,
  fieldAttribute,
  exactAttribute,
  distanceAttribute,
  onChange,
  textFieldValue,
  exactValue,
  setFieldValue
}) => {
  let isDateField = false
  if (label.toLowerCase().includes('date')) {
    isDateField = true
  }

  return (
    <Grid item sx={{ mb: 1 }}>
      <Grid
        container
        direction={'row'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Grid item>
          {isDateField ? (
            <SearchDateInput
              label={label}
              name={fieldAttribute}
              setFieldValue={setFieldValue}
            />
          ) : (
            <SearchTextInput
              label={label}
              textFieldValue={textFieldValue}
              onChange={e => onChange && onChange(e, e.target.value)}
              name={fieldAttribute}
            />
          )}
        </Grid>
        <Grid item sx={{ ml: 0.5 }}>
          <Grid item sx={{ mr: 2 }}>
            <ExactSwitch
              onChange={onChange}
              exactValue={exactValue}
              name={exactAttribute}
            />
          </Grid>
        </Grid>
        <Grid item>
          <FuzzyMatch
            disabled={exactValue}
            onChange={onChange}
            name={distanceAttribute}
            setFieldValue={setFieldValue}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SimpleSearchParameters
