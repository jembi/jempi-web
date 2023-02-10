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
import {
  FlagLabel,
  SearchFlagsOptionsProps,
  SearchQuery
} from '../../types/SimpleSearch'
import { PAGINATION_LIMIT } from '../../utils/constants'
import PageHeader from '../shell/PageHeader'
import SearchFlags from './SearchFlags'
import SearchRow from './SearchRow'
import SubmitButton from './SubmitButton'

const SimpleSearch: React.FC = () => {
  const { availableFields } = useAppConfig()
  const [isGoldenOnly, setIsGoldenOnly] = useState<boolean>(true)

  const options: SearchFlagsOptionsProps[] = [
    { value: 0, label: FlagLabel.GOLDEN_ONLY },
    { value: 1, label: FlagLabel.PATIENT_ONLY }
  ]

  const initialValues: SearchQuery = {
    parameters: availableFields.map(({ fieldType, fieldName }) => {
      return {
        fieldName,
        value: fieldType === 'Date' ? moment().format('DD/MM/YYYY') : '',
        distance: 0
      }
    }),
    sortBy: 'uid',
    sortAsc: false,
    offset: 0,
    limit: PAGINATION_LIMIT
  }

  return (
    <Container maxWidth={false}>
      <PageHeader
        description="Quickly access the information you need with our powerful search."
        title="Simple Search"
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
          <SubmitButton
            variant="outlined"
            href={'/search/custom'}
            label={<Typography variant="button">CUSTOM SEARCH</Typography>}
          />
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
                      <Typography variant="h5">Search</Typography>
                      {isGoldenOnly ? (
                        <Typography
                          variant="h5"
                          sx={{ color: '#FBC02D', fontWeight: 700 }}
                        >
                          Golden
                        </Typography>
                      ) : (
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                          Patient
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
                  <Grid item sx={{ mb: 1 }}>
                    <Stack direction={'row'} spacing={0.5}>
                      <Typography variant="body2">
                        Find info fast with these fixed fields or make your own
                        search rules with
                      </Typography>
                      <Typography variant="body2">
                        <Link href={'/search/custom'}>Custom Search</Link>
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
                          parameter && (
                            <SearchRow
                              field={field}
                              parameter={parameter}
                              onChange={handleChange}
                              key={field.fieldName}
                              index={index}
                            />
                          )
                        )
                      })}
                    </>
                  )}
                </FieldArray>
                <Grid item>
                  <LocationLink
                    to={`/search-results/${
                      isGoldenOnly ? 'golden' : 'patient'
                    }`}
                    search={{ payload: values }}
                    style={{ textDecoration: 'none' }}
                  >
                    <SubmitButton variant="contained" label="Search" />
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
