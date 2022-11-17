import { AxiosError } from 'axios'

import {
  Alert,
  AlertTitle,
  Box,
  Breadcrumbs,
  Chip,
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
import Match from '../../types/Match'

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
    valueFormatter: (params: GridValueFormatterParams<number>) =>
      `${params.value}%`
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
    renderCell: (params: GridRenderCellParams<any>) => {
      return (
        <Link href={`/match/${params.value.id}`} underline="none">
          VIEW
        </Link>
      )
    }
  }
]

const ReviewMatches = () => {
  //TODO Refactor to custom hook
  const { data, error, isFetching } = useQuery<Match[], AxiosError>(
    ['matches'],
    ApiClient.getMatches
  )

  return isFetching ? (
    <>
      <Skeleton variant="text" height={100}></Skeleton>
      <Skeleton variant="rectangular" height={600}></Skeleton>
    </>
  ) : error ? (
    // TODO Create a generic error handler
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {error.message}
    </Alert>
  ) : (
    <Box>
      <Typography variant="h5">Review Matches Review</Typography>
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography color="text.primary">Matches</Typography>
      </Breadcrumbs>
      <DataGrid
        columns={columns}
        rows={data as Match[]}
        pageSize={10}
        rowsPerPageOptions={[10]}
        sx={{ maxWidth: 1400, mt: 4 }}
        autoHeight={true}
      />
    </Box>
  )
}

export default ReviewMatches
