import { Person, Warning } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import { Button, Card, Divider, Grid, Typography } from '@mui/material'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { Container } from '@mui/system'
import { useMatch } from '@tanstack/react-location'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useAppConfig } from '../../hooks/useAppConfig'
import ApiClient from '../../services/ApiClient'
import AuditTrailRecord from '../../types/AuditTrail'
import PatientRecord from '../../types/PatientRecord'
import Loading from '../common/Loading'
import ApiErrorMessage from '../error/ApiErrorMessage'
import NotFound from '../error/NotFound'
import PageHeader from '../shell/PageHeader'
import { TableContent } from './TableContent'
import { Column, TableHeader } from './TableHeader'

const auditTrailColumns: readonly Column[] = [
  { id: 'process', label: 'Process', minWidth: 170 },
  {
    id: 'actionTaken',
    label: 'Action taken',
    minWidth: 170,
    align: 'left'
  },
  {
    id: 'links',
    label: 'Links',
    minWidth: 170,
    align: 'left'
  },
  {
    id: 'when',
    label: 'When',
    minWidth: 200,
    align: 'left'
  },
  {
    id: 'changedBy',
    label: 'Changed by',
    minWidth: 170,
    align: 'left'
  },
  {
    id: 'comment',
    label: 'Comment',
    minWidth: 170,
    align: 'left'
  }
]

const AuditTrail = () => {
  const {
    data: { uid, patient }
  } = useMatch()
  const { getPatientName } = useAppConfig()
  const { data, error, isLoading, isError } = useQuery<
    AuditTrailRecord[],
    AxiosError
  >({
    queryKey: ['auditTrail'],
    refetchOnWindowFocus: false,
    queryFn: async () => await ApiClient.getAuditTrail()
  })

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
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

  const patientName = getPatientName(patient as PatientRecord)
  console.log(patient)

  return (
    <Container>
      <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Grid item>
          <PageHeader
            description={
              <Typography fontSize="16px" letterSpacing="0.15px">
                {uid as string}
              </Typography>
            }
            title={patientName}
            breadcrumbs={[
              {
                icon: <SearchIcon />,
                title: 'Search Results'
              },
              {
                icon: <Person />,
                title: `Record Details`
              },
              {
                icon: <Warning />,
                title: 'Audit Trail'
              }
            ]}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{
              height: '36px',
              width: '152px',
              borderColor: theme => theme.palette.primary.main
            }}
            href={`/patient/${uid}`}
          >
            <Typography variant="button">BACK TO RECORD</Typography>
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <Card
        sx={{
          marginTop: '33px',
          background: '#FFFFFF',
          boxShadow: '0px 0px 0px 1px #E0E0E0',
          borderRadius: '4px'
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHeader columns={auditTrailColumns} />
            <TableContent
              data={data}
              columns={auditTrailColumns}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ gap: '26px' }}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data ? data.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  )
}

export default AuditTrail
