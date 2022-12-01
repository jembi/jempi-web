import {
  Alert,
  AlertTitle,
  Breadcrumbs,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Skeleton,
  Typography
} from '@mui/material'
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRenderCellParams,
  GridValueFormatterParams,
  GridValueGetterParams
} from '@mui/x-data-grid'
import { MakeGenerics, useNavigate, useSearch } from '@tanstack/react-location'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import ApiClient from '../../services/ApiClient'
import { NotificationState } from '../../types/Notification'
import PatientRecord from '../../types/PatientRecord'

type MatchDetailsParams = MakeGenerics<{
  Search: {
    notificationId: string
    patientId: string
    goldenId: string
    candidates: string[]
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

const MatchDetails = () => {
  const columns: GridColDef[] = [
    {
      field: 'type',
      headerName: 'Record Type',
      minWidth: 110,
      flex: 2,
      cellClassName: (params: GridCellParams<string>) => {
        return params.value === 'Current'
          ? 'current-patient-cell'
          : params.value === 'Golden'
          ? 'golden-patient-cell'
          : ''
      }
    },
    {
      field: 'match',
      headerName: 'Match',
      type: 'number',
      width: 100,
      minWidth: 80,
      align: 'center',
      headerAlign: 'center',
      valueFormatter: (params: GridValueFormatterParams<number>) =>
        params.value ? `${Math.round(params.value)}%` : null
    },
    {
      field: 'uid',
      headerName: 'UID',
      minWidth: 150,
      flex: 2
    },
    {
      field: 'identifiers',
      headerName: 'Identifiers',
      minWidth: 150,
      flex: 2
    },
    {
      field: 'firstName',
      headerName: 'First Name',
      minWidth: 150,
      flex: 2
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      minWidth: 150,
      flex: 2
    },
    {
      field: 'gender',
      headerName: 'Gender',
      minWidth: 110,
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'dob',
      headerName: 'DOB',
      type: 'date',
      minWidth: 110,
      flex: 1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'phoneNo',
      headerName: 'Phone No',
      minWidth: 110,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'city',
      headerName: 'City',
      minWidth: 110,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'updatedBy',
      headerName: 'Updated By',
      minWidth: 110,
      align: 'center',
      headerAlign: 'center'
    },
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
        return params.row.type === 'Current' ? (
          <Link
            component="button"
            onClick={handleCreateGoldenRecord}
            underline="none"
          >
            New Record
          </Link>
        ) : params.row.type === 'Golden' ? (
          <Link component="button" onClick={handleAcceptLink} underline="none">
            Accept
          </Link>
        ) : params.row.type === 'Candidate' ? (
          <Link
            component="button"
            onClick={() => handleLinkRecord(params.row.id)}
            underline="none"
          >
            Link
          </Link>
        ) : (
          <></>
        )
      }
    }
  ]

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

  const { data, error, isFetching } = useQuery<PatientRecord[], AxiosError>({
    queryKey: ['matchDetails'],
    queryFn: () =>
      ApiClient.getMatchDetails(
        searchParams.patientId!,
        searchParams.goldenId!,
        searchParams.candidates!
      ),
    refetchOnWindowFocus: false
  })

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

  const getName = (data: PatientRecord[] | undefined) => {
    return data && `${data[0].firstName} ${data[0].lastName}`
  }

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
      text: 'This will unlink from the current golden record and link this new record as the golden record',
      open: true
    })
  }

  const handleCancel = () => {
    setDialog({ open: false })
  }

  const handleConfirm = () => {
    switch (action) {
      case Action.CreateRecord:
        newGoldenRecord.mutate({ docID: data![0].id, goldenID: data![1].id })
        break
      case Action.Link:
        linkRecord.mutate({
          docID: data![0].id,
          goldenID: data![1].id,
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

  return isFetching ? (
    <Container>
      <Skeleton animation="wave" variant="text" height={100}></Skeleton>
      <Skeleton variant="rectangular" height={600}></Skeleton>
    </Container>
  ) : error ? (
    // TODO Create a generic error handler
    <Container>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error.message}
      </Alert>
    </Container>
  ) : (
    <Container maxWidth="xl">
      <Typography variant="h5">Patient Matches Detail</Typography>
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/review-matches/">
          Matches
        </Link>
        <Typography color="text.primary">{getName(data)}</Typography>
      </Breadcrumbs>
      <DataGrid
        columns={columns}
        rows={data as PatientRecord[]}
        pageSize={10}
        rowsPerPageOptions={[10]}
        sx={{
          mt: 4,
          '& .current-patient-cell': {
            color: '#7B61FF'
          },
          '& .golden-patient-cell': {
            color: '#FFC400'
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
