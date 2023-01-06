import Link from '@mui/material/Link'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import AuditTrailRecord from '../../types/AuditTrail'
import { ACTION_TYPE } from '../../utils/constants'
import { Column } from './TableHeader'

export interface TableContentProps<T> {
  data: T[] | undefined
  columns: readonly Column[]
  page: number
  rowsPerPage: number
}

export const TableContent: React.FC<TableContentProps<AuditTrailRecord>> = ({
  data,
  columns,
  page,
  rowsPerPage
}) => {
  return (
    <TableBody>
      {data
        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(row => {
          return (
            <TableRow
              hover
              role="checkbox"
              tabIndex={-1}
              key={row?.process}
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.002)' }}
            >
              {columns.map(({ id, align }) => {
                const value = row[id]
                return (
                  <TableCell key={id} align={align} sx={{ minWidth: 140 }}>
                    {id === 'links'
                      ? value.split(',').map(link => (
                          <Link
                            key={link}
                            href={'#'}
                            display="block"
                            whiteSpace="nowrap"
                          >
                            {link}
                          </Link>
                        ))
                      : id === 'actionTaken'
                      ? ACTION_TYPE[value]
                      : value}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
    </TableBody>
  )
}
