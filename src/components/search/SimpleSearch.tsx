import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography
} from '@mui/material'
import Divider from '@mui/material/Divider'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { FieldArray, Form, Formik } from 'formik'
import SimpleSearchDataModel from '../../model/search/SimpleSearchDataModel'
import ApiClient from '../../services/ApiClient'
import { Parameters, Search } from '../../types/SimpleSearch'
import PageHeader from './PageHeader'
import SearchFlags from './SearchFlags'
import SimpleSearchParametersComponent from './SimpleSearchParametersComponent'
import HomeIcon from '@mui/icons-material/Home'
import { MoreHorizOutlined } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
enum FlagLabel {
  ALL_RECORDS = 'ALL RECORDS',
  GOLDEN_ONLY = 'GOLDEN ONLY',
  PATIENT_ONLY = 'PATIENT ONLY'
}

const breadcrumbs = [
  <IconButton href="/">
    <HomeIcon />
  </IconButton>,
  <Stack direction={'row'} spacing={1}>
    <MoreHorizOutlined />
  </Stack>,
  <Stack direction={'row'} spacing={1}>
    <SearchIcon />
    <Typography color="text.primary">Search</Typography>
  </Stack>,
  <Stack direction={'row'} spacing={1}>
    <SearchIcon />
    <Typography color="text.primary">Search</Typography>
  </Stack>
]

const SimpleSearch = () => {
  //TODO: find a better way of handling error while posting the search request
  const postSearchQuery = useMutation({
    mutationFn: ApiClient.postSimpleSearchQuery,
    onError: (error: AxiosError) => {
      console.log(`Oops! Error getting search result: ${error.message}`)
    }
  })

  function handleOnFormSubmit(value: Search) {
    postSearchQuery.mutate(value)
    console.log(`send data to backend: ${JSON.stringify(value, null, 2)}`)
  }

  const initialValues: Search = SimpleSearchDataModel

  let range = [
    FlagLabel.ALL_RECORDS,
    FlagLabel.GOLDEN_ONLY,
    FlagLabel.PATIENT_ONLY
  ]

  return (
    <Container maxWidth={false}>
      <Grid container direction={'column'}>
        <Grid item container direction={'row'}>
          <Grid item lg={6}>
            <PageHeader
              description="Our quick and simple search."
              title="Simple Patient Search"
              breadcrumbs={breadcrumbs}
            />
          </Grid>
          <Grid item lg={6}>
            <SearchFlags
              range={range}
              to="/custom-search"
              label="CUSTOM SEARCH"
            />
          </Grid>
        </Grid>
        <Divider />
        <Formik
          initialValues={initialValues}
          onSubmit={values => {
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
                  mt: 4,
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
                        {values.parameters.map(
                          (data: Parameters, index: number) => {
                            const inputFieldLabel = data.field
                              .split(/(?=[A-Z])/)
                              .join(' ')
                            const fieldAttribute: string = `parameters[${index}].value`
                            const exactAttribute: string = `parameters[${index}].exact`
                            const distanceAttribute: string = `parameters[${index}].distance`

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
                          }
                        )}
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

export default SimpleSearch
