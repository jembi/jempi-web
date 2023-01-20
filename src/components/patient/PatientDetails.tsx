import { Person } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Button, Container, Grid } from '@mui/material'
import { useMatch } from '@tanstack/react-location'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useAppConfig } from '../../hooks/useAppConfig'
import ApiClient from '../../services/ApiClient'
import PatientRecord from '../../types/PatientRecord'
import Loading from '../common/Loading'
import ApiErrorMessage from '../error/ApiErrorMessage'
import NotFound from '../error/NotFound'
import PageHeader from '../shell/PageHeader'
import AddressPanel from './AddressPanel'
import ConfirmationModal from './ConfirmationModal'
import DemographicsPanel from './DemographicsPanel'
import IdentifiersPanel from './IdentifiersPanel'
import RegisteringFacilityPanel from './RegisteringFacilityPanel'
import RelationshipPanel from './RelationshipPanel'
import SubHeading from './SubHeading'

export interface UpdatedFields {
  id: number
  field: string
  original: any
  new: any
}

const PatientDetails = () => {
  const [patientData, setPatientData] = useState<PatientRecord | undefined>(
    undefined
  )
  const [isEditable, setIsEditable] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
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

  useEffect(() => {
    setPatientData(data)
  }, [data])

  const updatePatientRecord = useMutation({
    mutationFn: ApiClient.updatedPatientRecord,
    onError: (error: AxiosError) => {
      console.log(`Oops! Error persisting data: ${error.message}`)
    }
  })

  const filterOlderUpdates = (
    currentUpdate: UpdatedFields[],
    newUpdate: UpdatedFields[]
  ) => {
    newUpdate.forEach(element => {
      let update: UpdatedFields[] = []
      const oldField = currentUpdate.find(elem => elem.field)
      if (oldField) {
        update.push(
          ...currentUpdate.filter(elem => elem.field !== element.field),
          element
        )
      } else {
        update.push(element)
      }
      setUpdatedFields(update)
    })
  }

  const onDataChange = (newRow: PatientRecord) => {
    const newlyUpdatedFields: UpdatedFields[] = Object.keys(data || {}).reduce(
      (acc: UpdatedFields[], curr, idx: number) => {
        if (data && data[curr] !== newRow[curr]) {
          acc.push({
            id: idx,
            field: curr,
            original: data[curr],
            new: newRow[curr]
          })
        }
        return acc
      },
      []
    )

    filterOlderUpdates(updatedFields, newlyUpdatedFields)
    const updatedPatientRecord = { ...patientData }
    updatedFields.forEach(field => {
      updatedPatientRecord[field.field] = field.new
    })
    setPatientData(updatedPatientRecord as PatientRecord)
  }

  const onDataSave = () => {
    setIsModalVisible(true)
    setIsEditable(false)
  }

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <ApiErrorMessage error={error} />
  }

  if (!data || !patientData) {
    return <NotFound />
  }

  const onConfirm = () => {
    updatePatientRecord.mutate(patientData)
    setIsModalVisible(false)
  }
  const onCancel = () => {
    setPatientData(data)
    setIsModalVisible(false)
  }
  const patientName = getPatientName(data)

  return (
    <Container maxWidth="xl">
      <ConfirmationModal
        isVisible={isModalVisible}
        handleClose={onCancel}
        updatedFields={updatedFields}
        onConfirm={onConfirm}
      />
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
            data={patientData}
            isDataEditable={isEditable}
            onChange={onDataChange}
          />
        </Grid>
        <Grid item xs={3}>
          <RegisteringFacilityPanel
            data={data}
            isDataEditable={isEditable}
            onChange={onDataChange}
          />
        </Grid>
        <Grid item xs={5}>
          <AddressPanel
            data={patientData}
            isDataEditable={isEditable}
            onChange={onDataChange}
          />
        </Grid>
        <Grid item xs={8}>
          <DemographicsPanel
            data={patientData}
            isDataEditable={isEditable}
            onChange={onDataChange}
          />
        </Grid>
        <Grid item xs={4}>
          <RelationshipPanel
            data={patientData}
            isDataEditable={isEditable}
            onChange={onDataChange}
          />
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
