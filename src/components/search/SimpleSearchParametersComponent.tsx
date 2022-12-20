import { Grid } from '@mui/material'
import { Fragment } from 'react'
import SearchParameters from '../../types/SearchParameters'

import ExactSwitch from './ExactSwitch'
import FuzzyMatch from './FuzzyMatch'
import SearchTextInput from './SearchTextInput'

const SimpleSearchParametersComponent = (prop: SearchParameters) => {
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
            <SearchTextInput
              label={prop.label}
              textFieldValue={prop.textFieldValue}
              onChange={prop.handleChange}
              name={prop.fieldAttribute}
            />
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
