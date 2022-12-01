import { AxiosError } from 'axios'

import {
  Alert,
  AlertTitle,
  Breadcrumbs,
  Chip,
  Container,
  Link,
  Skeleton,
  Typography
} from '@mui/material'
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueFormatterParams,
  GridValueGetterParams
} from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'

import ApiClient from '../../services/ApiClient'
import Notification from '../../types/Notification'
import { Link as LocationLink } from '@tanstack/react-location'

const columns: GridColDef[] = [
  {
    field: 'reason',
    headerName: 'Reason for Match',
    minWidth: 150,
    flex: 2
  },
  {
    field: 'patient',
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
    valueGetter: (params: GridValueGetterParams) => params.row.linkedTo.score,
    valueFormatter: (params: GridValueFormatterParams<number>) =>
      `${params.value * 100}%`
  },
  {
    field: 'date',
    headerName: 'Date',
    type: 'date',
    minWidth: 110,
    flex: 1,
    align: 'center',
    headerAlign: 'center'
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
      const { patientId, linkedTo, candidates, id } = params.row
      return (
        <LocationLink
          to={`/match-details`}
          search={{
            notificationId: id,
            patientId,
            goldenId: linkedTo.gID,
            candidates: candidates.map(c => c.gID)
          }}
          style={{ textDecoration: 'none' }}
        >
          VIEW
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
      <Typography variant="h5">Review Matches</Typography>
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">Matches</Typography>
      </Breadcrumbs>
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
