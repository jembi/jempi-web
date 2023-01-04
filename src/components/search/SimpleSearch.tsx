import { MoreHorizOutlined } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import Divider from '@mui/material/Divider'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { FieldArray, Form, Formik } from 'formik'
import moment from 'moment'
import { useAppConfig } from '../../hooks/useAppConfig'
import ApiClient from '../../services/ApiClient'
import { SearchQuery } from '../../types/SimpleSearch'
import PageHeader from '../shell/PageHeader'
import SearchFlags from './SearchFlags'
import SimpleSearchParameter from './SimpleSearchParameters'

enum FlagLabel {
  ALL_RECORDS = 'ALL RECORDS',
  GOLDEN_ONLY = 'GOLDEN ONLY',
  PATIENT_ONLY = 'PATIENT ONLY'
}

const SimpleSearch: React.FC = () => {
  const { availableFields } = useAppConfig()
  //TODO: find a better way of handling error while posting the search request
  const postSearchQuery = useMutation({
    mutationFn: ApiClient.postSimpleSearchQuery,
    onError: (error: AxiosError) => {
      console.log(`Oops! Error getting search result: ${error.message}`)
    }
  })

  function handleOnFormSubmit(value: SearchQuery) {
    postSearchQuery.mutate(value)
    console.log(`send data to backend: ${JSON.stringify(value, null, 2)}`)
  }

  const initialValues: SearchQuery = {
    parameters: availableFields.map(({ fieldType, fieldName }) => {
      return {
        fieldName,
        value: fieldType === 'Date' ? moment().format('DD/MM/YYYY') : '',
        exact: false,
        distance: 1
      }
    })
  }

  return (
    <Container maxWidth={false}>
      <Grid container direction={'column'}>
        <Grid item container direction={'row'}>
          <Grid item lg={6}>
            <PageHeader
              description="Our quick and simple search."
              title="Simple Patient Search"
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
          <Grid item lg={4}>
            <SearchFlags
              options={[
                FlagLabel.ALL_RECORDS,
                FlagLabel.GOLDEN_ONLY,
                FlagLabel.PATIENT_ONLY
              ]}
            />
          </Grid>
          <Grid item lg={2} textAlign="right">
            <Button
              variant="outlined"
              sx={{ height: '42px', width: '172px' }}
              href={'/custom-search'}
            >
              {'CUSTOM SEARCH'}
            </Button>
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
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Grid container direction="column" width="fit-content">
                  <Grid item container direction="column" width="fit-content">
                    <Grid item>
                      <Typography variant="h5">Search Records</Typography>
                    </Grid>
                    <Grid item sx={{ mb: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme => theme.palette.primary.main
                        }}
                      >
                        Use custom search
                      </Typography>
                    </Grid>
                  </Grid>
                  <FieldArray name="search">
                    {() => (
                      <>
                        {availableFields.map((field, index) => {
                          const parameter = values.parameters[index]
                          return (
                            <SimpleSearchParameter
                              field={field}
                              parameter={parameter}
                              index={index}
                              onChange={handleChange}
                              key={field.fieldName}
                            />
                          )
                        })}
                      </>
                    )}
                  </FieldArray>
                  <Grid item>
                    {/* TODO move colors to theme */}
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
