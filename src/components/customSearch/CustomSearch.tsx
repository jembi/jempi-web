import { MoreHorizOutlined } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import Divider from '@mui/material/Divider'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { FieldArray, Form, Formik } from 'formik'
import ApiClient from '../../services/ApiClient'
import { $or, FlagLabel, SearchParameter } from '../../types/SimpleSearch'
import SearchFlags from '../search/SearchFlags'
import PageHeader from '../shell/PageHeader'
import FieldGroup from './FieldGroup'
import AddFieldOrGroupButton from './AddFieldOrGroupButton'

const CustomSearch: React.FC = () => {
  //TODO: find a better way of handling error while posting the search request
  const { mutate } = useMutation({
    mutationFn: ApiClient.postCustomSearchQuery,
    onError: (error: AxiosError) => {
      console.log(`Oops! Error getting search result: ${error.message}`)
    }
  })

  const initialCustomSearchValues: SearchParameter = {
    fieldName: '',
    value: '',
    distance: 0
  }

  function handleOnFormSubmit(value: $or) {
    mutate(value)
    console.log(`send data to backend: ${JSON.stringify(value, null, 2)}`)
  }

  const initialValues: $or = {
    $or: [
      {
        parameters: [initialCustomSearchValues]
      }
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
          <Formik initialValues={initialValues} onSubmit={handleOnFormSubmit}>
            {({ values, handleChange, setFieldValue }) => (
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
                  <Grid container direction="column" width="100%">
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
                    <FieldArray name="$or">
                      {({ push, remove }) => (
                        <>
                          {values.$or.map((parameters, index) => {
                            return (
                              <FieldGroup
                                values={parameters}
                                handleChange={handleChange}
                                initialCustomSearchValues={
                                  initialCustomSearchValues
                                }
                                fieldGroupIndex={index}
                                removeFieldGroup={remove}
                                key={index}
                                setFieldValue={setFieldValue}
                                push={push}
                              />
                            )
                          })}

                          <Grid
                            item
                            container
                            direction="column"
                            width="100%"
                            alignItems={'center'}
                            sx={{ mt: 1 }}
                          >
                            <Grid
                              item
                              container
                              direction="row"
                              width="756px"
                              justifyContent={'flex-end'}
                            >
                              {/* <Button
                                variant="text"
                                startIcon={<AddIcon />}
                                onClick={() => {
                                  push({
                                    parameters: [initialCustomSearchValues]
                                  })
                                }}
                                sx={{ fontSize: '13px' }}
                              >
                                Add Group
                              </Button> */}
                              <AddFieldOrGroupButton
                                push={push}
                                initialCustomSearchValues={
                                  initialCustomSearchValues
                                }
                                label="Add group"
                              />
                            </Grid>
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
