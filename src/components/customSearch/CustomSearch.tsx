import { MoreHorizOutlined } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import Divider from '@mui/material/Divider'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { FieldArray, Form, Formik } from 'formik'
import { useState } from 'react'
import ApiClient from '../../services/ApiClient'
import { CustomSearchQuery, FlagLabel, SearchFlagsOptionsProps, SearchParameter, SimpleSearchQuery } from '../../types/SimpleSearch'
import PageHeader from '../shell/PageHeader'
import AddFieldOrGroupButton from './AddFieldOrGroupButton'
import FieldGroup from './FieldGroup'
import SearchFlags from '../search/SearchFlags'

const CustomSearch: React.FC = () => {
  const [isGoldenRecord, setisGoldenRecord] = useState<boolean>(true)

  
  const options: SearchFlagsOptionsProps[] = [
    { value: 0, label: FlagLabel.GOLDEN_ONLY },
    { value: 1, label: FlagLabel.PATIENT_ONLY }
  ]
  //TODO: find a better way of handling error while posting the search request
  const { mutate } = useMutation({
    mutationFn: ApiClient.postCustomSearchQuery,
    onError: (error: AxiosError) => {
      console.log(`Oops! Error getting search result: ${error.message}`)
    }
  })

  const initialSearchParameter: SearchParameter = {
    fieldName: '',
    value: '',
    distance: 0
  }

  function handleOnFormSubmit(value: CustomSearchQuery) {
    mutate(value)
    console.log(`send data to backend: ${JSON.stringify(value, null, 2)}`)
  }

  const initialValues: CustomSearchQuery = {
    $or: [
      {
        parameters: [initialSearchParameter]
      }
    ]
  }

  return (
    <>
      <Container maxWidth={false}>
        <Grid container direction={'column'}>
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
                buttons={[
                  <SearchFlags
                    options={options}
                    setisGoldenRecord={setisGoldenRecord}
                  />,
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
                ]}
              />
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
                          {values.$or.map((parameters: SimpleSearchQuery, index: number) => {
                            return (
                              <FieldGroup
                                values={parameters}
                                handleChange={handleChange}
                                initialCustomSearchValues={
                                  initialSearchParameter
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
                              <AddFieldOrGroupButton
                                onClick={push}
                                initialCustomSearchValues={{
                                  parameters: [initialSearchParameter]
                                }}
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
