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

const useAuditTrailQuery = () => {
  const {
    data: { uid }
  } = useMatch()
  const patientQuery = useQuery<PatientRecord, AxiosError>({
    queryKey: ['patient', uid],
    queryFn: async () => await ApiClient.getPatient(uid as string),
    refetchOnWindowFocus: false
  })
  const auditTrailQuery = useQuery<AuditTrailRecord[], AxiosError>({
    queryKey: ['auditTrail'],
    refetchOnWindowFocus: false,
    queryFn: async () => await ApiClient.getAuditTrail()
  })

  return {
    patient: patientQuery.data,
    auditTrail: auditTrailQuery.data,
    isLoading: patientQuery.isLoading || auditTrailQuery.isLoading,
    error: patientQuery.error || auditTrailQuery.error
  }
}

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
    data: { uid }
  } = useMatch()
  const { getPatientName } = useAppConfig()
  const { patient, auditTrail, isLoading, error } = useAuditTrailQuery()
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

  if (error) {
    return <ApiErrorMessage error={error} />
  }

  if (!auditTrail) {
    return <NotFound />
  }

  return (
    <Container>
      <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Grid item>
          {patient && (
            <PageHeader
              description={
                <Typography fontSize="16px" letterSpacing="0.15px">
                  {patient.uid}
                </Typography>
              }
              title={getPatientName(patient)}
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
          )}
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
              data={auditTrail}
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
          count={auditTrail ? auditTrail.length : 0}
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
