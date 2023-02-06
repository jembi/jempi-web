import { MoreHorizOutlined } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
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
import PageHeader from '../shell/PageHeader'
import SearchFlags from './SearchFlags'
import SearchRow from './SearchRow'

const SimpleSearch: React.FC = () => {
  const { availableFields } = useAppConfig()
  const [isGoldenRecord, setisGoldenRecord] = useState<boolean>(true)

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
            href={'/custom-search-screen'}
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
                    to={
                      isGoldenRecord
                        ? '/search/golden'
                        : '/search/patient'
                    }
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
