import {
  Breadcrumbs,
  Container,
  Link,
  Typography,
  Grid,
  Button,
  Box
} from '@mui/material'
import { Formik, Form, FieldArray } from 'formik'
import SimpleSearchParametersComponent from './SimpleSearchParametersComponent'
import SearchFlags from './SearchFlags'
import SimpleSearchDataModel from '../../model/search/SimpleSearchDataModel'

interface Parameters {
  field: string
  value: string
  exact: boolean
  distance: number
}

interface Search {
  search: Parameters[]
}
enum FlagLabel {
  ALL_RECORDS = 'ALL RECORDS',
  GOLDEN_ONLY = 'GOLDEN ONLY',
  PATIENT_ONLY = 'PATIENT ONLY'
}
const Search = () => {
  const initialValues: Search = SimpleSearchDataModel

  //TODO: set the correct value object type
  function handleOnFormSubmit(value: Search) {
    console.log(`send data to backend: ${JSON.stringify(value, null, 2)}`)
  }
  return (
    <Container
      sx={{
        ml: 0,
        mr: 0
      }}
      maxWidth={false}
    >
      <Grid container direction={'column'}>
        <Grid item container direction={'row'}>
          <Grid item lg={6}>
            <Typography variant="h5">Simple Search</Typography>
            <Breadcrumbs>
              <Link underline="hover" color="inherit" href="/search">
                Search
              </Link>
              <Typography color="text.primary">Simple</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item lg={6}>
            <SearchFlags
              button1Label={FlagLabel.ALL_RECORDS}
              button2Label={FlagLabel.GOLDEN_ONLY}
              button3Label={FlagLabel.PATIENT_ONLY}
              to="/custom-search"
              label="CUSTOM SEARCH"
            />
          </Grid>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={values => {
            //TODO: use useMutation to send data to the backend
            handleOnFormSubmit(values)
          }}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form>
              <Box
                sx={{
                  width: '100%',
                  borderRadius: '4px',
                  boxShadow: '0px 0px 0px 1px #E0E0E0',
                  background: '#FFFFFF',
                  mt: 3,
                  padding: 2
                }}
              >
                <Grid container direction={'column'} justifyContent={'center'}>
                  <Grid item sx={{ mr: 3 }}>
                    <Grid container direction={'row'}>
                      <Grid item xs={4} />
                      <Grid item>
                        <Typography
                          sx={{
                            fontFamily: 'Roboto',
                            fontStyle: 'normal',
                            fontSize: '24px',
                            color: 'rgba(0, 0, 0, 0.6)'
                          }}
                        >
                          Search Records
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sx={{ mb: 2, mr: 3 }}>
                    <Grid container direction={'row'}>
                      <Grid item xs={4} />
                      <Grid item>
                        <Typography
                          sx={{
                            fontFamily: 'Roboto',
                            fontStyle: 'normal',
                            fontSize: '14px',
                            color: '#1976D2'
                          }}
                        >
                          Use custom search
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  <FieldArray name="search">
                    {() => (
                      <div>
                        {values.search.map((data, index) => {
                          const inputFieldLabel = data.field
                            .split(/(?=[A-Z])/)
                            .join(' ')
                          const fieldAttribute: string = `search[${index}].value`
                          const exactAttribute: string = `search[${index}].exact`
                          const distanceAttribute: string = `search[${index}].distance`

                          return (
                            <div key={data.field}>
                              <SimpleSearchParametersComponent
                                fieldAttribute={fieldAttribute}
                                exactAttribute={exactAttribute}
                                distanceAttribute={distanceAttribute}
                                label={inputFieldLabel}
                                handleChange={handleChange}
                                textFieldValue={data.value}
                                exactValue={data.exact}
                                distanceValue={data.distance}
                                fieldName={data.field}
                                setFieldValue={setFieldValue}
                              />
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </FieldArray>
                </Grid>
                <Grid item sx={{ mr: 3 }}>
                  <Grid container direction={'row'}>
                    <Grid item xs={4} />
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: '#274263',
                        color: 'white',
                        '&:hover': { backgroundColor: '#375982' }
                      }}
                      type="submit"
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          )}
        </Formik>
      </Grid>
    </Container>
  )
}

export default Search
