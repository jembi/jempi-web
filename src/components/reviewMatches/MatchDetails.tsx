import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link
} from '@mui/material'
import {
  DataGrid,
  GridCellParams,
  GridColumns,
  GridRenderCellParams,
  GridValueFormatterParams,
  GridValueGetterParams
} from '@mui/x-data-grid'
import { MakeGenerics, useNavigate, useSearch } from '@tanstack/react-location'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useAppConfig } from '../../hooks/useAppConfig'
import ApiClient from '../../services/ApiClient'
import { DisplayField } from '../../types/Fields'
import { NotificationState } from '../../types/Notification'
import { AnyRecord } from '../../types/PatientRecord'
import Loading from '../common/Loading'
import ApiErrorMessage from '../error/ApiErrorMessage'
import NotFound from '../error/NotFound'
import PageHeader from '../shell/PageHeader'

type MatchDetailsParams = MakeGenerics<{
  Search: {
    notificationId: string
    patient_id: string
    golden_id: string
    score: number
    candidates: { golden_id: string; score: number }[]
  }
}>

enum Action {
  Accept,
  Link,
  CreateRecord
}

interface DialogParams {
  title?: string
  text?: string
  open: boolean
}

//TODO Move horrible function to the backend
const mapDataToScores = (
  data?: AnyRecord[],
  score?: number,
  candidates?: { golden_id: string; score: number }[]
): AnyRecord[] => {
  if (!data?.length) {
    return []
  }
  data[1].score = score || 0
  for (let i = 2; i < data.length; i++) {
    data[i].score =
      candidates?.find(c => c.golden_id === data[i].uid)?.score || 0
  }
  return data
}

const getCellClassName = (
  params: GridCellParams<string>,
  field: DisplayField,
  data: AnyRecord
) => {
  if (field.groups.includes('demographics')) {
    return params.value === data[params.field] ? 'matching-cell' : ''
  } else return ''
}

const MatchDetails = () => {
  const { availableFields, getPatientName } = useAppConfig()
  const [action, setAction] = useState<Action>()
  const [recordId, setRecordId] = useState('')
  const [dialog, setDialog] = useState<DialogParams>({
    title: '',
    text: '',
    open: false
  })

  const searchParams = useSearch<MatchDetailsParams>()

  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const { data, error, isLoading, isError } = useQuery<AnyRecord[], AxiosError>(
    {
      queryKey: ['matchDetails', searchParams],
      queryFn: () => {
        return ApiClient.getMatchDetails(
          searchParams.patient_id!,
          searchParams.golden_id!,
          searchParams.candidates?.map(c => c.golden_id) || []
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
      setDialog({ open: false })
    }
  })

  const accept = useMutation({
    mutationFn: ApiClient.updateNotification,
    onSuccess: () => {
      enqueueSnackbar('Patient linked', {
        variant: 'success'
      })
      navigate({ to: '/review-matches' })
    },
    onError: (error: AxiosError) => {
      enqueueSnackbar(`Error updating notification: ${error.message}`, {
        variant: 'error'
      })
      setDialog({ open: false })
    }
  })

  const newGoldenRecord = useMutation({
    mutationFn: ApiClient.newGoldenRecord,
    onSuccess: () => {
      enqueueSnackbar('New golden record created', {
        variant: 'success'
      })
      navigate({ to: '/review-matches' })
      updateNotification.mutate({
        notificationId: searchParams.notificationId!,
        state: NotificationState.Actioned
      })
    },
    onError: (error: AxiosError) => {
      enqueueSnackbar(`Error creating new golden record: ${error.message}`, {
        variant: 'error'
      })
      setDialog({ open: false })
    }
  })

  const linkRecord = useMutation({
    mutationFn: ApiClient.linkRecord,
    onSuccess: () => {
      enqueueSnackbar('Linked to candidate golden record', {
        variant: 'success'
      })
      navigate({ to: '/review-matches' })
      updateNotification.mutate({
        notificationId: searchParams.notificationId!,
        state: NotificationState.Actioned
      })
    },
    onError: (error: AxiosError) => {
      enqueueSnackbar(`Error linking to golden record: ${error.message}`, {
        variant: 'error'
      })
      setDialog({ open: false })
    }
  })

  const handleCreateGoldenRecord = () => {
    setAction(Action.CreateRecord)
    setDialog({
      title: 'Confirm create golden record',
      text: 'This will unlink from the current golden record and create a new golden record',
      open: true
    })
  }

  const handleAcceptLink = () => {
    setAction(Action.Accept)
    setDialog({
      title: 'Confirm record link',
      text: 'This will link these two records',
      open: true
    })
  }

  const handleLinkRecord = (id: string) => {
    setAction(Action.Link)
    setRecordId(id)
    setDialog({
      title: 'Confirm record link',
      text: 'This will unlink from the current golden record and link this record as the golden record',
      open: true
    })
  }

  const handleCancel = () => {
    setDialog({ open: false })
  }

  const handleConfirm = () => {
    switch (action) {
      case Action.CreateRecord:
        newGoldenRecord.mutate({
          docID: data![0].uid,
          goldenID: data![1].uid
        })
        break
      case Action.Link:
        linkRecord.mutate({
          docID: data![0].uid,
          goldenID: data![1].uid,
          newGoldenID: recordId
        })
        break
      case Action.Accept:
        accept.mutate({
          notificationId: searchParams.notificationId!,
          state: NotificationState.Actioned
        })
        break
      default:
        break
    }
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

  const columns: GridColumns = [
    {
      field: 'score',
      headerName: 'Match',
      type: 'number',
      width: 100,
      minWidth: 80,
      align: 'center',
      headerAlign: 'center',
      valueFormatter: (params: GridValueFormatterParams<number>) =>
        params.value ? `${Math.round(params.value * 100)}%` : null
    },
    ...availableFields.map(field => {
      const { fieldName, fieldLabel, formatValue } = field
      return {
        field: fieldName,
        headerName: fieldLabel,
        flex: 1,
        valueFormatter: ({ value }: any) => formatValue(value),
        cellClassName: (params: GridCellParams<string>) =>
          getCellClassName(params, field, data[0])
      }
    }),
    {
      field: 'actions',
      headerName: 'Actions',
      maxWidth: 180,
      minWidth: 120,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      filterable: false,
      valueGetter: (params: GridValueGetterParams) => ({
        id: params.row.id,
        patient: params.row.patient,
        type: params.row.type
      }),
      renderCell: (params: GridRenderCellParams<any>) => {
        switch (params.row.type) {
          case 'Current':
            return (
              <Link
                component="button"
                onClick={handleCreateGoldenRecord}
                underline="none"
              >
                New Record
              </Link>
            )
          case 'Golden':
            return (
              <Link
                component="button"
                onClick={handleAcceptLink}
                underline="none"
              >
                Accept
              </Link>
            )
          case 'Candidate':
            return (
              <Link
                component="button"
                onClick={() => handleLinkRecord(params.row.uid)}
                underline="none"
              >
                Link
              </Link>
            )
          default:
            return <></>
        }
      }
    }
  ]

  return (
    <Container maxWidth="xl">
      <PageHeader
        title={'Patient Matches Detail'}
        breadcrumbs={[
          {
            link: '/review-matches/',
            title: 'Matches'
          },
          {
            link: '/review-matches/',
            title: getPatientName(data![0])
          }
        ]}
      />
      <DataGrid
        columns={columns}
        rows={mapDataToScores(
          data,
          searchParams.score,
          searchParams.candidates
        )}
        pageSize={10}
        rowsPerPageOptions={[10]}
        getRowId={row => row.uid}
        getRowClassName={params =>
          params.row.type === 'Golden' ? 'golden-row' : ''
        }
        sx={{
          mt: 4,
          '& .current-patient-cell': {
            color: '#7B61FF'
          },
          '& .golden-patient-cell': {
            color: '#D79B01'
          },
          '& .golden-row': {
            backgroundColor: 'rgba(255, 202, 40, 0.2)'
          },
          '& .matching-cell': {
            fontWeight: 'bold'
          }
        }}
        autoHeight={true}
      />

      <Dialog open={dialog.open} onClose={handleCancel}>
        <DialogTitle>{dialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialog.text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleConfirm} autoFocus>
            {accept.isLoading || newGoldenRecord.isLoading ? (
              <CircularProgress />
            ) : (
              'Confirm'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default MatchDetails
