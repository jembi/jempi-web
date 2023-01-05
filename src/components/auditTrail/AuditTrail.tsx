import { Card } from '@mui/material'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { Container } from '@mui/system'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import ApiClient from '../../services/ApiClient'
import AuditTrailRecord from '../../types/AuditTrail'
import Loading from '../common/Loading'
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
  const { data, isLoading } = useQuery<AuditTrailRecord[], AxiosError>({
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
  return (
    <Container>
      {isLoading && data ? (
        <Loading />
      ) : (
        <Card
          sx={{
            maxWidth: 1300,
            background: '#FFFFFF',
            boxShadow: '0px 0px 0px 1px #E0E0E0',
            borderRadius: '4px'
          }}
        >
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader>
              <TableHeader columns={auditTrailColumns} />
              <TableContent
                data={data || [{}]}
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
      )}
    </Container>
  )
}

export default AuditTrail
