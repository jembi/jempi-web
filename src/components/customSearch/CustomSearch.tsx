import { MoreHorizOutlined } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import Divider from '@mui/material/Divider'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { FieldArray, Form, Formik } from 'formik'
import ApiClient from '../../services/ApiClient'
import {
  CustomSearchQuery,
  FlagLabel,
  CustomSearchParameters
} from '../../types/SimpleSearch'
import SearchFlags from '../search/SearchFlags'
import PageHeader from '../shell/PageHeader'
import CustomSearchRow from './CustomSearchRow'

const CustomSearch: React.FC = () => {
  //TODO: find a better way of handling error while posting the search request
  const { mutate } = useMutation({
    mutationFn: ApiClient.postCustomSearchQuery,
    onError: (error: AxiosError) => {
      console.log(`Oops! Error getting search result: ${error.message}`)
    }
  })

  const initialCustomSearchValues: CustomSearchParameters = {
    fieldName: '',
    value: '',
    exact: false,
    distance: 1,
    condition: ''
  }

  function handleOnFormSubmit(value: CustomSearchQuery) {
    mutate(value)
    console.log(`send data to backend: ${JSON.stringify(value, null, 2)}`)
  }

  const initialValues: CustomSearchQuery = {
    parameters: [
      initialCustomSearchValues
    ]
  }

  return (
    <>
      <Container maxWidth={false}>
        <Grid container direction={'column'}>
          <Grid item container direction={'row'}>
            <Grid item lg={6}>
              <PageHeader
                description="You can customize your search below."
                title="Custom Patient Search"
                breadcrumbs={[
                  {
                    icon: <MoreHorizOutlined />
                  },
                  {
                    icon: <SearchIcon />,
                    title: 'Search'
                  }
                ]}
              />
            </Grid>
            <Grid
              item
              container
              direction="row"
              spacing={2}
              justifyContent="right"
              lg={6}
            >
              <Grid item>
                <SearchFlags
                  options={[
                    FlagLabel.ALL_RECORDS,
                    FlagLabel.GOLDEN_ONLY,
                    FlagLabel.PATIENT_ONLY
                  ]}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  sx={{
                    height: '42px',
                    width: '172px',
                    borderColor: theme => theme.palette.primary.main
                  }}
                  href={'/search'}
                >
                  <Typography variant="button">SIMPLE SEARCH</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <Formik
            initialValues={initialValues}
            onSubmit={values => {
              handleOnFormSubmit(values)
            }}
          >
            {({ values, handleChange }) => (
              <Form>
                <Box
                  sx={{
                    width: '100%',
                    borderRadius: '4px',
                    boxShadow: '0px 0px 0px 1px #E0E0E0',
                    mt: 4,
                    padding: 2,
                    display: 'flex'
                  }}
                >
                  <Grid container direction="column" width="fit-content">
                    <Grid
                      item
                      container
                      direction="row"
                      justifyContent="flex-start"
                      width="fit-content"
                    >
                      <Grid item>
                        <Typography
                          variant="h5"
                          sx={{
                            color: 'rgba(0, 0, 0, 0.6)'
                          }}
                        >
                          Custom Patient Search
                        </Typography>
                      </Grid>
                    </Grid>

                    <FieldArray name="parameters">
                      {({ push, remove }) => (
                        <>
                          {values.parameters.map((p, index) => {
                            const parameter = values.parameters[index]
                            return (
                              <CustomSearchRow
                                parameter={parameter}
                                index={index}
                                onChange={handleChange}
                                remove={remove}
                                enableCondition={index > 0}
                                enableDelete={index > 0}
                                key={index}
                              />
                            )
                          })}

                          <Grid
                            item
                            container
                            direction={'row'}
                            justifyContent={'center'}
                          >
                            <Button
                              variant="outlined"
                              startIcon={<AddIcon />}
                              onClick={() => {
                                push(initialCustomSearchValues)
                              }}
                            >
                              Add field
                            </Button>
                          </Grid>
                        </>
                      )}
                    </FieldArray>
                    <Grid item>
                      {/* TODO move colors to theme */}
                      <Stack direction={'row'} spacing={1}>
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
                        <Button
                          variant="outlined"
                          sx={{
                            borderColor: theme => theme.palette.primary.main,
                            color: theme => theme.palette.primary.main
                          }}
                          href="/search"
                        >
                          Cancel
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              </Form>
            )}
          </Formik>
        </Grid>
      </Container>
    </>
  )
}

export default CustomSearch
