import { Grid } from '@mui/material'
import SearchDateInput from './SearchDateInput'
import ExactSwitch from './ExactSwitch'
import FuzzyMatch from './FuzzyMatch'
import SearchTextInput from './SearchTextInput'

interface SearchParametersProps {
  label: string
  fieldAttribute: string
  exactAttribute: string
  distanceAttribute: string
  handleChange:
    | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined
  textFieldValue: string | Date
  exactValue: boolean
  distanceValue: number
  fieldName: string
  setFieldValue: Function
}

const SimpleSearchParameters: React.FC<SearchParametersProps> = ({
  label,
  fieldAttribute,
  exactAttribute,
  distanceAttribute,
  handleChange,
  textFieldValue,
  exactValue,
  distanceValue,
  fieldName,
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
              textFieldValue={textFieldValue}
              name={fieldAttribute}
              setFieldValue={setFieldValue}
            />
          ) : (
            <SearchTextInput
              label={label}
              textFieldValue={textFieldValue}
              onChange={handleChange}
              name={fieldAttribute}
            />
          )}
        </Grid>
        <Grid item sx={{ ml: 0.5 }}>
          <Grid item sx={{ mr: 2 }}>
            <ExactSwitch
              onChange={handleChange}
              exactValue={exactValue}
              name={exactAttribute}
            />
          </Grid>
        </Grid>
        <Grid item>
          <FuzzyMatch
            exactValue={exactValue}
            distanceValue={distanceValue}
            onChange={handleChange}
            name={distanceAttribute}
            setFieldValue={setFieldValue}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SimpleSearchParameters
