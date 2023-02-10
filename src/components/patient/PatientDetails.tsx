import { Person } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import { Box, ButtonGroup, Container, Grid } from '@mui/material'
import { useMatch } from '@tanstack/react-location'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useSnackbar } from 'notistack'
import { FC, useEffect, useState } from 'react'
import { useAppConfig } from '../../hooks/useAppConfig'
import ApiClient from '../../services/ApiClient'
import { DisplayField, FieldChangeReq } from '../../types/Fields'
import { GoldenRecord, PatientRecord } from '../../types/PatientRecord'
import Loading from '../common/Loading'
import ApiErrorMessage from '../error/ApiErrorMessage'
import NotFound from '../error/NotFound'
import SubmitButton from '../search/SubmitButton'
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

type PatientDetailsProps = {
  isGoldenRecord: boolean
}

const PatientDetails: FC<PatientDetailsProps> = ({ isGoldenRecord }) => {
  const {
    data: { uid }
  } = useMatch()
  const { availableFields } = useAppConfig()
  const { enqueueSnackbar } = useSnackbar()
  const { getPatientName } = useAppConfig()
  const [patientRecord, setPatientRecord] = useState<
    PatientRecord | GoldenRecord | undefined
  >(undefined)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [updatedFields, setUpdatedFields] = useState<UpdatedFields>({})
  const { data, error, isLoading, isError } = useQuery<
    PatientRecord | GoldenRecord,
    AxiosError
  >({
    queryKey: [isGoldenRecord ? 'golden-record' : 'patient-record', uid],
    queryFn: async () => {
      if (isGoldenRecord) {
        return await ApiClient.getGoldenRecord(uid as string)
      } else {
        return await ApiClient.getPatientRecord(uid as string)
      }
    },
    refetchOnWindowFocus: false
  })

  const updatePatientRecord = useMutation({
    mutationKey: ['golden-record', uid],
    mutationFn: async (req: FieldChangeReq) => {
      return await ApiClient.updatedGoldenRecord(uid as string, req)
    },
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

  const isEditable = isGoldenRecord && isEditMode

  const onDataChange = (newRow: PatientRecord | GoldenRecord) => {
    const newlyUpdatedFields: UpdatedFields = availableFields.reduce(
      (acc: UpdatedFields, curr: DisplayField, idx: number) => {
        if (data && data[curr.fieldName] !== newRow[curr.fieldName]) {
          acc[curr.fieldLabel] = {
            oldValue: data[curr.fieldName],
            newValue: newRow[curr.fieldName]
          }
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
    const fields = Object.keys(patientRecord).reduce(
      (acc: { name: string; value: any }[], curr: string) => {
        if (data[curr] !== patientRecord[curr]) {
          acc.push({ name: curr, value: patientRecord[curr] })
        }
        return acc
      },
      []
    )
    updatePatientRecord.mutate({ fields })
    setIsModalVisible(false)
    setIsEditMode(false)
    setUpdatedFields({})
  }
  const onCancelEditing = () => {
    setPatientRecord(data)
    setIsEditMode(false)
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
        description={<SubHeading data={data} isGoldenRecord={isGoldenRecord} />}
        title={patientName}
        breadcrumbs={[
          {
            icon: <SearchIcon />,
            title: 'Search Results'
          },
          {
            icon: <Person />,
            title: `${isGoldenRecord ? 'Golden' : 'Patient'} Record Details`
          }
        ]}
        buttons={
          !isGoldenRecord
            ? [
                <SubmitButton
                  variant="outlined"
                  className="mediumSizeButton"
                  sx={{
                    width: '117px'
                  }}
                  href={`/patient/${uid}/audit-trail`}
                  label="AUDIT TRAIL"
                />,

                <SubmitButton
                  variant="headerButton"
                  href={`/patient/${uid}/linked-records`}
                  label="LINKED RECORDS"
                />
              ]
            : []
        }
      />
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <IdentifiersPanel
            data={patientRecord}
            isEditable={isEditable}
            onChange={onDataChange}
          />
        </Grid>
        <Grid item xs={3}>
          <RegisteringFacilityPanel
            data={patientRecord}
            isEditable={isEditable}
            onChange={onDataChange}
          />
        </Grid>
        <Grid item xs={5}>
          <AddressPanel
            data={patientRecord}
            isEditable={isEditable}
            onChange={onDataChange}
          />
        </Grid>
        <Grid item xs={8}>
          <DemographicsPanel
            data={patientRecord}
            isEditable={isEditable}
            onChange={onDataChange}
          />
        </Grid>
        <Grid item xs={4}>
          <RelationshipPanel
            data={patientRecord}
            isEditable={isEditable}
            onChange={onDataChange}
          />
        </Grid>
      </Grid>
      {!isGoldenRecord && (
        <Box
          sx={{
            py: 4,
            display: 'flex',
            gap: '4px'
          }}
        >
          {isEditMode ? (
            <ButtonGroup>
              <SubmitButton
                onClick={() => onCancelEditing()}
                variant="outlined"
                sx={{
                  width: '85px'
                }}
                label="Cancel"
              />
              <SubmitButton
                onClick={() => onDataSave()}
                variant="outlined"
                sx={{
                  width: '66px'
                }}
                label="Save"
              />
            </ButtonGroup>
          ) : (
            <SubmitButton
              onClick={() => setIsEditMode(true)}
              variant="outlined"
              label="Edit Golden Record"
            />
          )}
        </Box>
      )}
    </Container>
  )
}

export default PatientDetails
