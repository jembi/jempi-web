import { Person } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Button, ButtonGroup, Container, Grid } from '@mui/material'
import { useMatch } from '@tanstack/react-location'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useSnackbar } from 'notistack'
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
  [fieldName: string]: { oldValue: any; newValue: any }
}

const PatientDetails = () => {
  const [patientRecord, setPatientRecord] = useState<PatientRecord | undefined>(
    undefined
  )
  const [isEditable, setIsEditable] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [updatedFields, setUpdatedFields] = useState<UpdatedFields>({})
  const {
    data: { uid }
  } = useMatch()
  const { enqueueSnackbar } = useSnackbar()
  const { getPatientName } = useAppConfig()
  const { data, error, isLoading, isError } = useQuery<
    PatientRecord,
    AxiosError
  >({
    queryKey: ['patient', uid],
    queryFn: async () => await ApiClient.getPatient(uid as string),
    refetchOnWindowFocus: false
  })

  const updatePatientRecord = useMutation({
    mutationKey: ['patient', uid],
    mutationFn: ApiClient.updatedPatientRecord,
    onSuccess: () => {
      enqueueSnackbar(`Successfully saved patient records`, {
        variant: 'success'
      })
    },
    onError: (error: AxiosError) => {
      enqueueSnackbar(`Could not save record changes`, {
        variant: 'error'
      })
      console.log(`Oops! Error persisting data: ${error.message}`)
    }
  })

  const onDataChange = (newRow: PatientRecord) => {
    const newlyUpdatedFields: UpdatedFields = Object.keys(data || {}).reduce(
      (acc: UpdatedFields, curr, idx: number) => {
        if (data && data[curr] !== newRow[curr]) {
          acc[curr] = { oldValue: data[curr], newValue: newRow[curr] }
        }
        return acc
      },
      {}
    )
    setUpdatedFields({ ...newlyUpdatedFields })
    setPatientRecord(newRow)
    return newRow
  }

  const onDataSave = () => {
    setIsModalVisible(true)
  }

  useEffect(() => {
    if (patientRecord === undefined) {
      setPatientRecord(data)
    }
  }, [data, patientRecord])

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <ApiErrorMessage error={error} />
  }

  if (!data || !patientRecord) {
    return <NotFound />
  }

  const onConfirm = () => {
    updatePatientRecord.mutate(patientRecord)
    setIsModalVisible(false)
    setIsEditable(false)
  }
  const onCancelEditing = () => {
    setPatientRecord(data)
    setIsEditable(false)
  }

  const onCancelConfirmation = () => {
    setIsModalVisible(false)
  }

  const patientName = getPatientName(data)

  return (
    <Container maxWidth={false}>
      <ConfirmationModal
        isVisible={isModalVisible}
        handleClose={onCancelConfirmation}
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
            data={patientRecord}
            isDataEditable={isEditable}
            onChange={onDataChange}
          />
        </Grid>
        <Grid item xs={3}>
          <RegisteringFacilityPanel
            data={patientRecord}
            isDataEditable={isEditable}
            onChange={onDataChange}
          />
        </Grid>
        <Grid item xs={5}>
          <AddressPanel
            data={patientRecord}
            isDataEditable={isEditable}
            onChange={onDataChange}
          />
        </Grid>
        <Grid item xs={8}>
          <DemographicsPanel
            data={patientRecord}
            isDataEditable={isEditable}
            onChange={onDataChange}
          />
        </Grid>
        <Grid item xs={4}>
          <RelationshipPanel
            data={patientRecord}
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
          <ButtonGroup>
            <Button
              onClick={() => onCancelEditing()}
              variant="outlined"
              sx={{
                height: '42px',
                borderColor: theme => theme.palette.primary.main
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => onDataSave()}
              variant="outlined"
              sx={{
                height: '42px',
                borderColor: theme => theme.palette.primary.main
              }}
            >
              Save
            </Button>
          </ButtonGroup>
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
