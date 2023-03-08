import { MoreHorizOutlined } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Button, Container, Grid, Stack } from '@mui/material'
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
import CustomSearchHeader from './CustomSearchHeader'
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
                <SearchFlags
                  options={options}
                  onChange={setIsGoldenOnly}
                  key="search-flags"
                />,
                <Button
                  variant="outlined"
                  href={'/search/simple'}
                  key="simple-search"
                >
                  SIMPLE SEARCH
                </Button>
              ]}
            />
          </Grid>

          <Divider />
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
              <CustomSearchHeader />
              <Formik
                initialValues={initialValues}
                onSubmit={() => console.log('Submited')}
              >
                {({ values, handleChange, setFieldValue }) => (
                  <Form>
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
                  </Form>
                )}
              </Formik>
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
                  <Stack direction={'row'} spacing={1} sx={{ flexGrow: 1 }}>
                    <LocationLink
                      to={`/search-results/${
                        isGoldenOnly ? 'golden' : 'patient'
                      }`}
                      // search={{ payload: values }}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button variant="contained">Search</Button>
                    </LocationLink>
                    <Button variant="outlined" href="/search/simple">
                      Cancel
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Container>
    </>
  )
}

export default CustomSearch
