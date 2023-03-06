import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography
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
import { GoldenRecord, NotificationState } from '../../types/Notification'
import { AnyRecord } from '../../types/PatientRecord'
import Loading from '../common/Loading'
import ApiErrorMessage from '../error/ApiErrorMessage'
import NotFound from '../error/NotFound'
import Button from '../shared/Button'
import PageHeader from '../shell/PageHeader'
import RefineSearchModal from './RefineSearchModal'

type MatchDetailsParams = MakeGenerics<{
  Search: {
    notificationId: string
    patient_id: string
    golden_id: string
    score: number
    candidates: GoldenRecord[] | undefined
    test: any
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
  candidates?: { golden_id: string; score: number }[]
): AnyRecord[] => {
  if (!data?.length) {
    return []
  }
  console.log(data)
  for (let i = 0; i < data.length; i++) {
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [dialog, setDialog] = useState<DialogParams>({
    title: '',
    text: '',
    open: false
  })
  const [openRefineSearch, setOpenRefineSearch] = useState<boolean>(false)

  const searchParams = useSearch<MatchDetailsParams>()

  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const { data, error, isLoading, isError } = useQuery<AnyRecord[], AxiosError>(
    {
      queryKey: ['matchDetails', searchParams],
      queryFn: () => {
        return ApiClient.getMatchDetails(
          searchParams.patient_id ? searchParams.patient_id : '',
          searchParams.golden_id ? searchParams.golden_id : '',
          searchParams.candidates?.map(c => c.golden_id) || []
        )
      },
      refetchOnWindowFocus: false
    }
  )
  console.log(searchParams)
  console.log(data)
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
        notificationId: searchParams.notificationId
          ? searchParams.notificationId
          : '',
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

  const handleRefineSearchClick = () => {
    setOpenRefineSearch(true)
  }

  const linkRecord = useMutation({
    mutationFn: ApiClient.linkRecord,
    onSuccess: () => {
      enqueueSnackbar('Linked to candidate golden record', {
        variant: 'success'
      })
      navigate({ to: '/review-matches' })
      updateNotification.mutate({
        notificationId: searchParams.notificationId
          ? searchParams.notificationId
          : '',
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
    setOpenRefineSearch(false)
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

  const handleConfirm = () => {
    switch (action) {
      case Action.CreateRecord:
        newGoldenRecord.mutate({
          patientID: data[0].uid,
          goldenID: data[1].uid
        })
        break
      case Action.Link:
        linkRecord.mutate({
          patientID: data[0].uid,
          goldenID: data[1].uid,
          newGoldenID: recordId
        })
        break
      case Action.Accept:
        accept.mutate({
          notificationId: searchParams.notificationId
            ? searchParams.notificationId
            : '',
          state: NotificationState.Actioned
        })
        break
      default:
        break
    }
  }

  const isOpen = Boolean(anchorEl)
  const open = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const close = () => {
    setAnchorEl(null)
  }

  const columns: GridColumns = [
    ...availableFields.map(field => {
      const { fieldName, fieldLabel, formatValue } = field
      if (fieldName === 'recordType') {
        return {
          field: fieldName,
          headerName: fieldLabel,
          flex: 1,
          valueFormatter: (
            params: GridValueFormatterParams<number | string | Date>
          ) => formatValue(params.value),
          cellClassName: (params: GridCellParams<string>) =>
            getCellClassName(params, field, data[0]),
          renderCell: (params: GridRenderCellParams) => {
            switch (params.row.type) {
              case 'Current':
                return <Typography>Patient</Typography>
              case 'Golden':
                return (
                  <Typography color="#D79B01" fontWeight={700}>
                    Golden
                  </Typography>
                )
              case 'Candidate':
                if (params.row.searched) {
                  return <Typography>Searched</Typography>
                } else {
                  return <Typography>Blocked</Typography>
                }
              default:
                return <></>
            }
          }
        }
      }
      return {
        field: fieldName,
        headerName: fieldLabel,
        flex: 1,
        valueFormatter: (
          params: GridValueFormatterParams<number | string | Date>
        ) => formatValue(params.value),
        cellClassName: (params: GridCellParams<string>) =>
          getCellClassName(params, field, data[0])
      }
    }),
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
      renderCell: (params: GridRenderCellParams) => {
        switch (params.row.type) {
          case 'Current':
            return (
              <IconButton
                aria-controls={isOpen ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isOpen ? 'true' : undefined}
                onClick={open}
                size="large"
                edge="end"
                disabled={true}
              >
                <MoreVertIcon />
              </IconButton>
            )
          case 'Golden':
            return (
              <IconButton
                aria-controls={isOpen ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isOpen ? 'true' : undefined}
                onClick={open}
                size="large"
                edge="end"
                disabled={true}
              >
                <MoreVertIcon />
              </IconButton>
            )
          case 'Candidate':
            return (
              <IconButton
                aria-controls={isOpen ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isOpen ? 'true' : undefined}
                onClick={open}
                size="large"
                edge="end"
              >
                <MoreVertIcon />
              </IconButton>
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
        buttons={[
          <Button variant="outlined" onClick={handleRefineSearchClick}>
            Refine Search
          </Button>
        ]}
      />
      <Divider />

      <Typography
        sx={{
          fontFamily: 'Roboto',
          fontSize: '12px',
          fontWeight: 400,
          lineHeight: '32px',
          letterSpacing: '1px',
          textAlign: 'left',
          mt: 4
        }}
      >
        PATIENT LINKED TO GOLDEN RECORD
      </Typography>
      <DataGrid
        columns={columns}
        rows={data.filter((r: AnyRecord) => {
          if (r.type === 'Golden' || r.type === 'Current') {
            return r
          }
        })}
        pageSize={10}
        rowsPerPageOptions={[10]}
        getRowId={row => row.uid}
        sx={{
          '& .current-patient-cell': {
            color: '#7B61FF'
          },
          '& .golden-patient-cell': {
            color: '#D79B01'
          },
          '& .matching-cell': {
            fontWeight: 'bold'
          }
        }}
        autoHeight={true}
      />
      <Typography
        sx={{
          fontFamily: 'Roboto',
          fontSize: '12px',
          fontWeight: 400,
          lineHeight: '32px',
          letterSpacing: '1px',
          textAlign: 'left',
          mt: 4
        }}
      >
        MATCHING RECORDS
      </Typography>
      <DataGrid
        columns={columns}
        rows={mapDataToScores(
          data.filter((r: AnyRecord) => {
            if (r.type === 'Candidate') {
              return r
            }
          }),
          searchParams.candidates
        )}
        pageSize={10}
        rowsPerPageOptions={[10]}
        getRowId={row => row.uid}
        sx={{
          '& .current-patient-cell': {
            color: '#7B61FF'
          },
          '& .golden-patient-cell': {
            color: '#D79B01'
          },
          '& .matching-cell': {
            fontWeight: 'bold'
          }
        }}
        autoHeight={true}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={close}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem>
          <Typography>View details</Typography>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Typography>Link this record</Typography>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <Typography>New golden record</Typography>
        </MenuItem>
      </Menu>

      <Dialog open={dialog.open} onClose={handleCancel}>
        <DialogTitle>{dialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialog.text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button
            onClick={handleConfirm}
            autoFocus
            isLoading={accept.isLoading || newGoldenRecord.isLoading}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <RefineSearchModal onCancel={handleCancel} onOpen={openRefineSearch} />
    </Container>
  )
}

export default MatchDetails
