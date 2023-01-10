import { AxiosError } from 'axios'

import { Alert, AlertTitle, Chip, Container, Skeleton } from '@mui/material'
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueFormatterParams,
  GridValueGetterParams
} from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'

import { Link as LocationLink } from '@tanstack/react-location'
import moment from 'moment'
import ApiClient from '../../services/ApiClient'
import Notification from '../../types/Notification'
import PageHeader from '../shell/PageHeader'

const columns: GridColDef[] = [
  {
    field: 'type',
    headerName: 'Reason for Match',
    minWidth: 150,
    flex: 2
  },
  {
    field: 'names',
    headerName: 'Patient',
    minWidth: 150,
    flex: 2
  },
  {
    field: 'match',
    headerName: 'Match',
    type: 'number',
    width: 100,
    minWidth: 80,
    align: 'center',
    headerAlign: 'center',
    valueGetter: (params: GridValueGetterParams) => params.row.score,
    valueFormatter: (params: GridValueFormatterParams<number>) =>
      `${Math.round(params.value * 100)}%`
  },
  {
    field: 'created',
    headerName: 'Date',
    type: 'date',
    minWidth: 110,
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    valueFormatter: (params: GridValueFormatterParams<number>) =>
      params.value ? moment(params.value).format('YYYY-MM-DD') : null
  },
  {
    field: 'state',
    headerName: 'State',
    width: 100,
    minWidth: 80,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params: GridRenderCellParams<string>) => {
      return (
        <Chip
          variant="outlined"
          label={params.value}
          color={params.value === 'New' ? 'primary' : 'default'}
        />
      )
    }
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
    renderCell: (params: GridRenderCellParams<any, Notification>) => {
      const { patient_id, candidates, score, id, golden_id, state } = params.row
      return (
        <LocationLink
          to={`/match-details`}
          search={{
            notificationId: id,
            patient_id,
            golden_id,
            score,
            candidates
          }}
          style={{ textDecoration: 'none' }}
        >
          {state !== 'Actioned' ? 'VIEW' : null}
        </LocationLink>
      )
    }
  }
]

const ReviewMatches = () => {
  //TODO Refactor to custom hook
  const { data, error, isFetching } = useQuery<Notification[], AxiosError>({
    queryKey: ['matches'],
    queryFn: ApiClient.getMatches,
    refetchOnWindowFocus: false
  })

  return isFetching ? (
    <Container>
      <Skeleton variant="text" height={100}></Skeleton>
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
    <Container>
      <PageHeader
        title={'Review Matches'}
        breadcrumbs={[
          {
            link: '/review-matches/',
            title: 'Matches'
          }
        ]}
      />
      <DataGrid
        columns={columns}
        rows={data as Notification[]}
        pageSize={10}
        rowsPerPageOptions={[10]}
        sx={{ maxWidth: 1400, mt: 4 }}
        autoHeight={true}
      />
    </Container>
  )
}

export default ReviewMatches
