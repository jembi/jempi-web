import {
  Alert,
  AlertTitle,
  Breadcrumbs,
  Container,
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
import { MakeGenerics, useSearch } from '@tanstack/react-location'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import ApiClient from '../../services/ApiClient'
import PatientRecord from '../../types/PatientRecord'

type MatchDetailsGenerics = MakeGenerics<{
  Search: {
    patientId: string
    goldenId: string
    candidates: string[]
  }
}>

const columns: GridColDef[] = [
  {
    field: 'type',
    headerName: 'Record Type',
    minWidth: 110,
    flex: 2,
    cellClassName: (params: GridCellParams<string>) => {
      if (params.value === 'Current') {
        return 'current-patient-cell'
      } else if (params.value === 'Golden') {
        return 'golden-patient-cell'
      }

      return ''
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
        <Link
          component="button"
          onClick={() => {} /*TODO Accept logic here*/}
          underline="none"
        >
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

const MatchDetails = () => {
  const searchParams = useSearch<MatchDetailsGenerics>()

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

  const getName = (data: PatientRecord[] | undefined) => {
    return data && `${data[0].firstName} ${data[0].lastName}`
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
    </Container>
  )
}

export default MatchDetails
