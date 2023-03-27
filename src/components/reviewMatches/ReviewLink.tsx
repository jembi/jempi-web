import { SearchOutlined } from '@mui/icons-material'
import {
  Box,
  Container,
  Divider,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography
} from '@mui/material'
import { MakeGenerics, useNavigate, useSearch } from '@tanstack/react-location'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useLinkReview } from 'hooks/useLinkReview'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { CustomSearchQuery, SearchQuery } from 'types/SimpleSearch'
import ApiClient from '../../services/ApiClient'
import { NotificationState } from '../../types/Notification'
import { AnyRecord } from '../../types/PatientRecord'
import Loading from '../common/Loading'
import ApiErrorMessage from '../error/ApiErrorMessage'
import NotFound from '../error/NotFound'
import Button from '../shared/Button'
import PageHeader from '../shell/PageHeader'
import DataGrid from './DataGrid'
import Dialog from './Dialog'
import SearchModal from './SearchModal'

export type ReviewLinkParams = MakeGenerics<{
  Search: {
    payload: {
      notificationId: string
      patient_id: string
      golden_id: string
      score: number
      candidates: { golden_id: string; score: number }[]
    }
  }
}>

const steps = [
  'Read Instructions',
  'Review Linked Records',
  'Refine Search (Optional)',
  'Close'
]

const ReviewLink = () => {
  const { payload } = useSearch<ReviewLinkParams>()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const [dialogText, setDialogText] = useState('')
  const [openLinkRecordDialog, setOpenLinkRecordDialog] = useState(false)
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false)
  const [opencreateNewGRecordDialog, setOpencreateNewGRecordDialog] =
    useState(false)
  const [tableData, setTableData] = useState<AnyRecord[]>([])
  const [canditateUID, setCandidateUID] = useState('')
  const [refineSearchQuery, setRefineSearchQuery] = useState<
    SearchQuery | CustomSearchQuery | undefined
  >(undefined)

  const {
    goldenRecord,
    patientRecord,
    candidateGoldenRecords,
    matchDetails,
    error,
    isLoading,
    isError
  } = useLinkReview(payload, refineSearchQuery)

  //TODO: on success we can invalidate matchDetails query and receive the updated one. Or SetQueryData

  const updateNotification = useMutation({
    mutationFn: ApiClient.updateNotification,
    onError: (error: AxiosError) => {
      enqueueSnackbar(`Error updating notification: ${error.message}`, {
        variant: 'error'
      })
      setOpenLinkRecordDialog(false)
    }
  })

  const acceptAndClose = () => {
    updateNotification.mutate(
      {
        notificationId: payload?.notificationId ? payload.notificationId : '',
        state: NotificationState.Accepted
      },
      {
        onSuccess: () => {
          enqueueSnackbar('Golden record accepted and notification closed', {
            variant: 'success'
          })
          navigate({ to: '/notifications' })
        }
      }
    )
  }
  const leavePending = () => {
    updateNotification.mutate(
      {
        notificationId: payload?.notificationId ? payload.notificationId : '',
        state: NotificationState.Pending
      },
      {
        onSuccess: () => {
          enqueueSnackbar(
            'Notification kept as pending. Golden Record remains linked',
            {
              variant: 'warning'
            }
          )
          navigate({ to: '/notifications' })
        }
      }
    )
  }

  const newGoldenRecord = useMutation({
    mutationFn: ApiClient.newGoldenRecord,
    onSuccess: () => {
      updateNotification.mutate({
        notificationId: payload?.notificationId ? payload.notificationId : '',
        state: NotificationState.Actioned
      })
    },
    onError: (error: AxiosError) => {
      enqueueSnackbar(`Error creating new golden record: ${error.message}`, {
        variant: 'error'
      })
      setOpencreateNewGRecordDialog(false)
    }
  })

  const linkRecord = useMutation({
    mutationFn: ApiClient.linkRecord,
    onSuccess: () => {
      enqueueSnackbar('Golden record accepted and notification closed', {
        variant: 'success'
      })
      navigate({ to: '/notifications' })
      updateNotification.mutate({
        notificationId: payload?.notificationId ? payload.notificationId : '',
        state: NotificationState.Actioned
      })
    },
    onError: (error: AxiosError) => {
      enqueueSnackbar(`Error linking to golden record: ${error.message}`, {
        variant: 'error'
      })
      setOpenLinkRecordDialog(false)
    }
  })

  const handleCreateNewGR = (id: string) => {
    newGoldenRecord.mutate(
      {
        patientID: patientRecord ? patientRecord.uid : '',
        goldenID: goldenRecord ? goldenRecord.uid : '',
        newGoldenID: id
      },
      {
        onSuccess: () => {
          enqueueSnackbar('New record linked', {
            variant: 'success'
          })
          navigate({ to: `/golden-record/${id}` })
        }
      }
    )
  }

  const handleLinkRecord = (id: string) => {
    linkRecord.mutate({
      patientID: patientRecord ? patientRecord.uid : '',
      goldenID: goldenRecord ? goldenRecord.uid : '',
      newGoldenID: id
    })
  }

  const handleCancel = () => {
    setOpencreateNewGRecordDialog(false)
    setOpenLinkRecordDialog(false)
  }

  if (isLoading) {
    return <Loading />
  }

  if (isError && error) {
    return <ApiErrorMessage error={error} />
  }

  if (!matchDetails) {
    return <NotFound />
  }

  const handleOpenLinkedRecordDialog = (uid: string) => {
    const tableDataTemp = candidateGoldenRecords?.filter(d => {
      if (d.uid === uid) {
        return d
      }
    })

    if (tableDataTemp && patientRecord)
      setTableData([patientRecord, ...tableDataTemp])

    setOpenLinkRecordDialog(true)
    setCandidateUID(uid)
    close()
  }

  const handleOpenCreateNewGRDialog = () => {
    setDialogText(
      `Are you sure you want to unlink the patient record ${patientRecord?.uid} and golden record ${goldenRecord?.uid} and create a new record?`
    )
    setOpencreateNewGRecordDialog(true)
    setCandidateUID(patientRecord?.uid || '')
  }

  return (
    <Container maxWidth={false}>
      <Stepper sx={{ mb: 5 }} activeStep={1}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <PageHeader
        title={'Review Linked Patient Record'}
        description="Review the patient record and possible matches in detail."
        buttons={[
          <Button
            startIcon={<SearchOutlined />}
            variant="outlined"
            size="large"
            onClick={() => setIsSearchModalVisible(true)}
          >
            Refine Search
          </Button>
        ]}
      />
      <Divider
        sx={{
          mb: 3
        }}
      />
      <Box
        sx={{
          mb: 3,
          borderRadius: '4px',
          boxShadow: '0px 0px 0px 1px #E0E0E0'
        }}
      >
        <Typography pl={1.5} variant="dgSubTitle">
          PATIENT LINKED TO GOLDEN RECORD
        </Typography>

        <DataGrid
          data={matchDetails.filter((r: AnyRecord) => {
            if (r.type === 'Golden' || r.type === 'Current') {
              return r
            }
          })}
          sx={{
            '.MuiDataGrid-columnSeparator': {
              display: 'none'
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#274263',
              color: '#FFF',
              borderRadius: '0px'
            },
            borderRadius: '0px',
            p: 0
          }}
        />
      </Box>
      <Typography variant="dgSubTitle">OTHER GOLDEN RECORDS</Typography>
      <DataGrid
        data={candidateGoldenRecords || []}
        handleOpenCreateNewGRDialog={handleOpenCreateNewGRDialog}
        handleOpenLinkedRecordDialog={handleOpenLinkedRecordDialog}
        sx={{
          '& .MuiDataGrid-columnHeaders': { display: 'none' },
          '& .MuiDataGrid-virtualScroller': { marginTop: '0!important' }
        }}
      />
      <Stack direction="row" sx={{ mt: 3 }} justifyContent={'space-between'}>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={() => acceptAndClose()}>
            Accept & Close
          </Button>
          <Button variant="outlined" onClick={() => leavePending()}>
            Leave as pending
          </Button>
        </Stack>
        <Button
          variant="outlined"
          onClick={() => handleOpenCreateNewGRDialog()}
        >
          Create new golden record
        </Button>
      </Stack>
      <SearchModal
        isOpen={isSearchModalVisible}
        onClose={() => setIsSearchModalVisible(false)}
        onChange={setRefineSearchQuery}
      />
      <Dialog
        buttons={[
          <Button onClick={() => handleCancel()}>Cancel</Button>,
          <Button
            onClick={() => handleCreateNewGR(canditateUID)}
            isLoading={newGoldenRecord.isLoading}
            autoFocus
          >
            Unlink and create new record
          </Button>
        ]}
        content={dialogText}
        title="Confirm Records Unlinking"
        onClose={handleCancel}
        onOpen={opencreateNewGRecordDialog}
      />
      <Dialog
        buttons={[
          <Button onClick={() => handleCancel()}>Don&apos;t link</Button>,
          <Button onClick={() => handleLinkRecord(canditateUID)}>
            Link records
          </Button>
        ]}
        content={<DataGrid data={tableData} hideAction={true} />}
        title="Linke these records?"
        subTitle="This will link the following records"
        onClose={handleCancel}
        onOpen={openLinkRecordDialog}
        maxWidth="lg"
        fullWidth={true}
      />
    </Container>
  )
}

export default ReviewLink
