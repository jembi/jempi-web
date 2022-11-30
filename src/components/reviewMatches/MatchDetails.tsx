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
        params.value ? `${params.value}%` : null
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
            onClick={() => {} /*TODO New golden record logic here*/}
            underline="none"
          >
            New Record
          </Link>
        ) : params.row.type === 'Golden' ? (
          <Link component="button" onClick={acceptLink} underline="none">
            Accept
          </Link>
        ) : params.row.type === 'Candidate' ? (
          <Link
            component="button"
            onClick={() => {} /*TODO Link logic here*/}
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

  const [openDialog, setOpenDialog] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('')
  const [dialogText, setDialogText] = useState('')

  const searchParams = useSearch<MatchDetailsParams>()

  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const { data, error, isFetching } = useQuery<PatientRecord[], AxiosError>(
    ['matches'],
    () =>
      ApiClient.getMatchDetails(
        searchParams.patientId!,
        searchParams.goldenId!,
        searchParams.candidates!
      ),
    { refetchOnWindowFocus: false }
  )

  const updateNotification = useMutation({
    mutationFn: ApiClient.updateNotification,
    onSuccess: () => {
      enqueueSnackbar('Patient linked', {
        variant: 'success'
      })
      navigate({ to: '/review-matches' })
    },
    onError: (error: AxiosError) => {
      enqueueSnackbar(`Error: ${error.message}`, {
        variant: 'error'
      })
      setOpenDialog(false)
    }
  })

  const getName = (data: PatientRecord[] | undefined) => {
    return data && `${data[0].firstName} ${data[0].lastName}`
  }

  const acceptLink = () => {
    setDialogTitle('Confirm record link')
    setDialogText('This will link these two records')
    setOpenDialog(true)
  }

  const handleCancel = () => {
    setOpenDialog(false)
  }

  const handleConfirm = () => {
    updateNotification.mutate({
      notificationId: searchParams.notificationId!,
      state: NotificationState.Actioned
    })
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

      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleConfirm} autoFocus>
            {updateNotification.isLoading ? <CircularProgress /> : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default MatchDetails
