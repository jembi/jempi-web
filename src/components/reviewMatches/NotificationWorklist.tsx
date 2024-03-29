import { People } from '@mui/icons-material'
import { Container, Divider } from '@mui/material'
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueFormatterParams,
  GridValueGetterParams
} from '@mui/x-data-grid'
import { Link as LocationLink } from '@tanstack/react-location'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Loading from 'components/common/Loading'
import ApiErrorMessage from 'components/error/ApiErrorMessage'
import NotFound from 'components/error/NotFound'
import { formatDate, formatName } from 'utils/formatters'
import ApiClient from '../../services/ApiClient'
import Notification from '../../types/Notification'
import PageHeader from '../shell/PageHeader'
import DataGridToolbar from './DataGridToolBar'
import NotificationState from './NotificationState'

const columns: GridColDef[] = [
  {
    field: 'state',
    headerName: 'Status',
    width: 100,
    minWidth: 80,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params: GridRenderCellParams<string>) => {
      return <NotificationState value={params.value || ''} />
    }
  },
  {
    field: 'type',
    headerName: 'Notification Type',
    minWidth: 150
  },
  {
    field: 'reason',
    headerName: 'Notification Reason',
    minWidth: 150,
    flex: 2
  },
  {
    field: 'names',
    headerName: 'Patient',
    minWidth: 150,
    flex: 2,
    valueFormatter: (params: GridValueFormatterParams<string>) =>
      formatName(params.value)
  },
  {
    field: 'score',
    headerName: 'Score',
    type: 'number',
    width: 100,
    minWidth: 80,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (params: GridValueGetterParams) => params.row.score
  },
  {
    field: 'created',
    headerName: 'Date',
    type: 'date',
    minWidth: 110,
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    valueFormatter: (params: GridValueFormatterParams<Date>) =>
      formatDate(params.value)
  },
  {
    field: 'actions',
    headerName: 'Actions',
    maxWidth: 150,
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    sortable: false,
    filterable: false,
    valueGetter: (params: GridValueGetterParams) => ({
      id: params.row.id,
      patient: params.row.patient
    }),
    renderCell: (params: GridRenderCellParams<string, Notification>) => {
      const { patient_id, candidates, score, id, golden_id, status } =
        params.row
      return (
        <LocationLink
          to={`/notifications/match-details`}
          search={{
            payload: {
              notificationId: id,
              patient_id,
              golden_id,
              score,
              candidates
            }
          }}
          style={{ textDecoration: 'none' }}
        >
          {status !== 'Actioned' ? 'VIEW' : null}
        </LocationLink>
      )
    }
  }
]

const NotificationWorklist = () => {
  const { data, error, isLoading, isFetching } = useQuery<
    Notification[],
    AxiosError
  >({
    queryKey: ['notifications'],
    queryFn: ApiClient.getMatches,
    refetchOnWindowFocus: false
  })

  if (isLoading || isFetching) {
    return <Loading />
  }

  if (error) {
    return <ApiErrorMessage error={error} />
  }

  if (!data) {
    return <NotFound />
  }

  return (
    <Container maxWidth={false}>
      <PageHeader
        title={'Notification Worklist'}
        description="View the list of possible matches."
        breadcrumbs={[
          {
            link: '/review-matches/',
            title: 'Notifications',
            icon: <People />
          }
        ]}
      />
      <Divider />
      <DataGrid
        columns={columns}
        components={{
          Toolbar: () => <DataGridToolbar />
        }}
        rows={data as Notification[]}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        sx={{ mt: 4 }}
        autoHeight={true}
      />
    </Container>
  )
}

export default NotificationWorklist
