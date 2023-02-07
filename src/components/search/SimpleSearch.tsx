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
import moment from 'moment'
import { useState } from 'react'
import { useAppConfig } from '../../hooks/useAppConfig'
import { FlagLabel, SearchQuery } from '../../types/SimpleSearch'
import PageHeader from '../shell/PageHeader'
import SearchFlags from './SearchFlags'
import SearchRow from './SearchRow'

const SimpleSearch: React.FC = () => {
  const [isGoldenRecord, setisGoldenRecord] = useState<boolean>(false)
  
  const { availableFields } = useAppConfig()

  const initialValues: SearchQuery = {
    parameters: availableFields.map(({ fieldType, fieldName }) => {
      return {
        fieldName,
        value: fieldType === 'Date' ? moment().format('DD/MM/YYYY') : '',
        distance: 0
      }
    }),
    sortBy: '',
    sortAsc: true,
    offset: 0,
    limit: 10
  }

  return (
    <Container maxWidth={false}>
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
        buttons={[
          <SearchFlags
            options={[
              FlagLabel.ALL_RECORDS,
              FlagLabel.GOLDEN_ONLY,
              FlagLabel.PATIENT_ONLY
            ]}
          />,
          <Button
            variant="outlined"
            sx={{
              height: '42px',
              width: '172px',
              borderColor: theme => theme.palette.primary.main
            }}
            href={'/custom-search'}
          >
            <Typography variant="button">CUSTOM SEARCH</Typography>
          </Button>
        ]}
      />
      <Divider />
      <Formik
        initialValues={initialValues}
        onSubmit={() => console.log('Submited')}
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
                    <Stack direction={'row'} spacing={0.5}>
                      <Typography
                        variant="h5"
                        sx={{ color: theme => theme.typography.h5 }}
                      >
                        Search
                      </Typography>
                      {isGoldenRecord ? (
                        <Typography
                          variant="h5"
                          sx={{ color: '#FBC02D', fontWeight: 700 }}
                        >
                          Golden
                        </Typography>
                      ) : (
                        <Typography
                          variant="h5"
                          sx={{ color: 'rgba(0, 0, 0, 0.6)', fontWeight: 700 }}
                        >
                          Golden
                        </Typography>
                      )}

                      <Typography
                        variant="h5"
                        sx={{ color: theme => theme.typography.h5 }}
                      >
                        Records
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item sx={{ mb: 2 }}>
                    <Stack direction={'row'} spacing={0.5}>
                      <Typography variant="body2">
                        Find info fast with these fixed fields or make your own
                        search rules with
                      </Typography>
                      <Typography variant="body2">
                        <Link href={'/custom-search-screen'}>
                          Custom Search
                        </Link>
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
                <FieldArray name="search">
                  {() => (
                    <>
                      {availableFields.map((field, index) => {
                        const parameter = values.parameters[index]
                        return (
                          <SearchRow
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
                  <LocationLink
                    to="/search-results/golden"
                    search={{ payload: values }}
                    style={{ textDecoration: 'none' }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: '#274263',
                        color: 'white',
                        '&:hover': { backgroundColor: '#375982' }
                      }}
                    >
                      Search
                    </Button>
                  </LocationLink>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default SimpleSearch
