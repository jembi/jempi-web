import { MoreHorizOutlined } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Stack,
  Typography
} from '@mui/material'
import Divider from '@mui/material/Divider'
import { Link as LocationLink } from '@tanstack/react-location'
import { FieldArray, Form, Formik } from 'formik'
import { useState } from 'react'
import {
  CustomSearchQuery,
  FlagLabel,
  SearchFlagsOptionsProps,
  SearchParameter,
  SimpleSearchQuery
} from '../../types/SimpleSearch'
import { PAGINATION_LIMIT } from '../../utils/constants'
import SearchFlags from '../search/SearchFlags'
import PageHeader from '../shell/PageHeader'
import AddFieldOrGroupButton from './AddFieldOrGroupButton'
import FieldGroup from './FieldGroup'

const CustomSearch: React.FC = () => {
  const [isGoldenOnly, setIsGoldenOnly] = useState<boolean>(true)
  const options: SearchFlagsOptionsProps[] = [
    { value: 0, label: FlagLabel.GOLDEN_ONLY },
    { value: 1, label: FlagLabel.PATIENT_ONLY }
  ]

  const initialSearchParameter: SearchParameter = {
    fieldName: '',
    value: '',
    distance: 0
  }

  function handleOnFormSubmit(value: CustomSearchQuery) {
    console.log(`send data to backend: ${JSON.stringify(value, null, 2)}`)
  }

  const initialValues: CustomSearchQuery = {
    $or: [
      {
        parameters: [initialSearchParameter]
      }
    ],
    sortBy: 'uid',
    sortAsc: true,
    offset: 0,
    limit: PAGINATION_LIMIT
  }

  return (
    <>
      <Container maxWidth={false}>
        <Grid container direction={'column'}>
          <Grid item lg={6}>
            <PageHeader
              description="Tailor your search to quickly find the information you need."
              title="Custom Search"
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
                <SearchFlags options={options} onChange={setIsGoldenOnly} />,
                <Button variant="outlined" href={'/search/simple'}>
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
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Grid container direction="column" width="100%">
                    <Grid
                      item
                      container
                      direction="row"
                      justifyContent="center"
                      width="100%"
                    >
                      <Grid
                        item
                        container
                        width={'756px'}
                        direction={'row'}
                        justifyContent={'flex-start'}
                        sx={{ mt: 1, mb: 3 }}
                      >
                        <Stack direction={'column'} spacing={1}>
                          <Typography variant="h5">
                            Custom Your Search Rules
                          </Typography>
                          <Typography variant="body2">
                            <Link href={'/search/simple'}>
                              Use simple search
                            </Link>
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                    <FieldArray name="$or">
                      {({ push, remove }) => (
                        <>
                          {values.$or.map(
                            (parameters: SimpleSearchQuery, index: number) => {
                              return (
                                <FieldGroup
                                  values={parameters}
                                  handleChange={handleChange}
                                  initialCustomSearchValues={{
                                    parameters: [initialSearchParameter]
                                  }}
                                  fieldGroupIndex={index}
                                  removeFieldGroup={remove}
                                  key={index}
                                  setFieldValue={setFieldValue}
                                  push={push}
                                />
                              )
                            }
                          )}

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
                    <Grid
                      item
                      container
                      direction="row"
                      justifyContent="center"
                      width="100%"
                    >
                      <Grid
                        item
                        container
                        width={'756px'}
                        direction={'row'}
                        justifyContent={'flex-start'}
                        sx={{ mt: 2 }}
                      >
                        {/* TODO move colors to theme */}
                        <Stack
                          direction={'row'}
                          spacing={1}
                          sx={{ flexGrow: 1 }}
                        >
                          <LocationLink
                            to={`/search-results/${
                              isGoldenOnly ? 'golden' : 'patient'
                            }`}
                            search={{ payload: values }}
                            style={{ textDecoration: 'none' }}
                          >
                            <Button variant="contained">Search</Button>
                          </LocationLink>
                          <Button
                            variant="outlined"
                            className="cancelButton"
                            href="/search/simple"
                          >
                            Cancel
                          </Button>
                        </Stack>
                        <Grid item>
                          <Button
                            variant="outlined"
                            className="mediumSizeButton"
                          >
                            Query Builder
                          </Button>
                        </Grid>
                      </Grid>
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
