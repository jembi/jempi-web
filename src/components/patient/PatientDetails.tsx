import { Person } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Button, Container, Grid } from '@mui/material'
import { useMatch } from '@tanstack/react-location'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useAppConfig } from '../../hooks/useAppConfig'
import ApiClient from '../../services/ApiClient'
import PatientRecord from '../../types/PatientRecord'
import Loading from '../common/Loading'
import ApiErrorMessage from '../error/ApiErrorMessage'
import NotFound from '../error/NotFound'
import PageHeader from '../shell/PageHeader'
import AddressPanel from './AddressPanel'
import DemographicsPanel from './DemographicsPanel'
import IdentifiersPanel from './IdentifiersPanel'
import RegisteringFacilityPanel from './RegisteringFacilityPanel'
import RelationshipPanel from './RelationshipPanel'
import SubHeading from './SubHeading'

interface UpdatedFields {
  id: number
  field: string
  original: any
  new: any
  timeStamp: Date
}

const PatientDetails = () => {
  const [isEditable, setIsEditable] = useState(false)
  const [updatedFields, setUpdatedFields] = useState<UpdatedFields[]>([])
  const {
    data: { uid }
  } = useMatch()
  const { getPatientName } = useAppConfig()
  const { data, error, isLoading, isError } = useQuery<
    PatientRecord,
    AxiosError
  >({
    queryKey: ['patient', uid],
    queryFn: async () => await ApiClient.getPatient(uid as string),
    refetchOnWindowFocus: false
  })

  const onDataChange = (newRow: PatientRecord) => {
    const newlyUpdatedFields: UpdatedFields[] = Object.keys(data || {}).reduce(
      (acc: UpdatedFields[], curr, idx: number) => {
        if (data && data[curr] !== newRow[curr]) {
          acc.push({
            id: idx,
            field: curr,
            original: data[curr],
            new: newRow[curr],
            timeStamp: new Date()
          })
        }
        return acc
      },
      []
    )

    setUpdatedFields([...updatedFields, ...newlyUpdatedFields])
  }

  console.log(updatedFields)
  const onDataSave = () => {
    console.log('holaa')
    setIsEditable(false)
  }

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <ApiErrorMessage error={error} />
  }

  if (!data) {
    return <NotFound />
  }

  const patientName = getPatientName(data)

  return (
    <Container maxWidth="xl">
      <PageHeader
        description={<SubHeading data={data} />}
        title={patientName}
        breadcrumbs={[
          {
            icon: <SearchIcon />,
            title: 'Search Results'
          },
          {
            icon: <Person />,
            title: `${
              data.type === 'Golden' ? 'Golden' : 'Patient'
            } Record Details`
          }
        ]}
        buttons={[
          <Button
            variant="outlined"
            sx={{
              height: '36px',
              width: '117px',
              borderColor: theme => theme.palette.primary.main
            }}
            href={`/patient/${uid}/audit-trail`}
          >
            AUDIT TRAIL
          </Button>,
          <Button
            variant="contained"
            sx={{
              height: '36px',
              width: '152px',
              borderColor: theme => theme.palette.primary.main
            }}
            href={`/patient/${uid}/linked-records`}
          >
            LINKED RECORDS
          </Button>
        ]}
      />
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <IdentifiersPanel
            data={data}
            isDataEditable={isEditable}
            onChange={onDataChange}
          />
        </Grid>
        <Grid item xs={3}>
          <RegisteringFacilityPanel data={data} isDataEditable={isEditable} />
        </Grid>
        <Grid item xs={5}>
          <AddressPanel data={data} isDataEditable={isEditable} />
        </Grid>
        <Grid item xs={8}>
          <DemographicsPanel
            data={data}
            isDataEditable={isEditable}
            onChange={onDataChange}
          />
        </Grid>
        <Grid item xs={4}>
          <RelationshipPanel data={data} isDataEditable={isEditable} />
        </Grid>
      </Grid>
      <Box
        sx={{
          py: 4,
          display: 'flex',
          gap: '4px'
        }}
      >
        {isEditable ? (
          <Button
            onClick={() => onDataSave()}
            variant="outlined"
            sx={{
              height: '42px',
              borderColor: theme => theme.palette.primary.main
            }}
          >
            {isEditable ? 'Save' : 'Edit Golden Record'}
          </Button>
        ) : (
          <Button
            onClick={() => setIsEditable(true)}
            variant="outlined"
            sx={{
              height: '42px',
              borderColor: theme => theme.palette.primary.main
            }}
          >
            Edit Golden Record
          </Button>
        )}
      </Box>
    </Container>
  )
}

export default PatientDetails
