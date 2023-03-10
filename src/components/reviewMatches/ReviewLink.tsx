import { Container, Divider, Stack, Typography } from '@mui/material'
import { MakeGenerics, useNavigate, useSearch } from '@tanstack/react-location'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useAppConfig } from '../../hooks/useAppConfig'
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

type ReviewLinkParams = MakeGenerics<{
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

//TODO Move horrible function to the backend
const mapDataToScores = (
  data?: AnyRecord[],
  candidates?: { golden_id: string; score: number }[]
): AnyRecord[] => {
  if (!data?.length) {
    return []
  }

  for (let i = 0; i < data.length; i++) {
    data[i].score =
      candidates?.find(c => c.golden_id === data[i].uid)?.score || 0
  }
  return data
}

const ReviewLink = () => {
  const { getPatientName } = useAppConfig()
  const [dialogText, setDialogText] = useState<string>('')
  const [openLinkRecordDialog, setOpenLinkRecordDialog] =
    useState<boolean>(false)
  const [opencreateNewGRecordDialog, setOpencreateNewGRecordDialog] =
    useState<boolean>(false)
  const [tableData, setTableData] = useState<AnyRecord[]>([])
  const { payload } = useSearch<ReviewLinkParams>()
  const [canditateUID, setCandidateUID] = useState<string>('')

  const navigate = useNavigate()

  const { enqueueSnackbar } = useSnackbar()

  const { data, error, isLoading, isError } = useQuery<AnyRecord[], AxiosError>(
    {
      queryKey: ['matchDetails', payload],
      queryFn: () => {
        return ApiClient.getMatchDetails(
          payload?.patient_id ? payload.patient_id : '',
          payload?.golden_id ? payload.golden_id : '',
          payload?.candidates?.map(c => c.golden_id) || []
        )
      },
      refetchOnWindowFocus: false
    }
  )

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
        patientID: data ? data[0].uid : '',
        goldenID: data ? data[1].uid : '',
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
      patientID: data ? data[0].uid : '',
      goldenID: data ? data[1].uid : '',
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

  if (isError) {
    return <ApiErrorMessage error={error} />
  }

  if (!data) {
    return <NotFound />
  }

  const handleOpenLinkedRecordDialog = (uid: string) => {
    const tableDataTemp: AnyRecord[] = data.filter(d => {
      if (d.uid === uid || d.type === 'Golden') {
        return d
      }
    })

    setTableData(tableDataTemp)
    setOpenLinkRecordDialog(true)
    setCandidateUID(uid)
    close()
  }

  const handleOpenCreateNewGRDialog = (uid: string) => {
    const goldenRecordUid = data[1].uid

    setDialogText(
      `Are you sure you want to unlink the patient record ${uid} and golden record ${goldenRecordUid} and create a new record?`
    )
    setOpencreateNewGRecordDialog(true)
    setCandidateUID(uid)
  }

  return (
    <Container maxWidth="xl">
      <PageHeader
        title={'Review Linked Patient Record'}
        description="Review the patient record and possible matches in detail."
        breadcrumbs={[
          {
            link: '/review-matches/',
            title: 'Matches'
          },
          {
            link: '/review-matches/',
            title: getPatientName(data[0])
          }
        ]}
      />
      <Divider
        sx={{
          mb: 4
        }}
      />

      <Typography variant="dgSubTitle">
        PATIENT LINKED TO GOLDEN RECORD
      </Typography>
      <DataGrid
        data={data.filter((r: AnyRecord) => {
          if (r.type === 'Golden' || r.type === 'Current') {
            return r
          }
        })}
        sx={{
          mb: 4
        }}
      />
      <Typography variant="dgSubTitle">OTHER GOLDEN RECORDS</Typography>
      <DataGrid
        data={mapDataToScores(
          data.filter((r: AnyRecord) => {
            if (r.type === 'Candidate') {
              return r
            }
          }),
          payload?.candidates
        )}
        handleOpenCreateNewGRDialog={handleOpenCreateNewGRDialog}
        handleOpenLinkedRecordDialog={handleOpenLinkedRecordDialog}
      />

      <Stack direction="row" sx={{ mt: 3 }} spacing={1}>
        <Button variant="contained" onClick={() => acceptAndClose()}>
          Accept & Close
        </Button>
        <Button variant="outlined" onClick={() => leavePending()}>
          Leave as pending
        </Button>
      </Stack>
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
