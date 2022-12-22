import { Grid } from '@mui/material'
import { Fragment } from 'react'
import SearchDateInput from './SearchDateInput'
import ExactSwitch from './ExactSwitch'
import FuzzyMatch from './FuzzyMatch'
import SearchTextInput from './SearchTextInput'

interface SearchParameters {
  label: string
  fieldAttribute: string
  exactAttribute: string
  distanceAttribute: string
  handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
  textFieldValue: string | Date
  exactValue: boolean
  distanceValue: number
  fieldName: string
  setFieldValue: Function
}

const SimpleSearchParametersComponent = (prop: SearchParameters) => {
  let isDateField = false
  if (prop.label.toLowerCase().includes('date')) {
    isDateField = true
  }

  return (
    <Fragment>
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
                label={prop.label}
                textFieldValue={prop.textFieldValue}
                name={prop.fieldAttribute}
                setFieldValue={prop.setFieldValue}
              />
            ) : (
              <SearchTextInput
                label={prop.label}
                textFieldValue={prop.textFieldValue}
                onChange={prop.handleChange}
                name={prop.fieldAttribute}
              />
            )}
          </Grid>
          <Grid item sx={{ ml: 0.5 }}>
            <Grid item sx={{ mr: 2 }}>
              <ExactSwitch
                onChange={prop.handleChange}
                exactValue={prop.exactValue}
                name={prop.exactAttribute}
              />
            </Grid>
          </Grid>
          <Grid item>
            <FuzzyMatch
              exactValue={prop.exactValue}
              distanceValue={prop.distanceValue}
              onChange={prop.handleChange}
              name={prop.distanceAttribute}
              setFieldValue={prop.setFieldValue}
            />
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default SimpleSearchParametersComponent
