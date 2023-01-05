import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import React from 'react'
import { Column } from './TableHeader'

export const TableContent: React.FC<{
  data: any[]
  columns: readonly Column[]
  page: number
  rowsPerPage: number
}> = ({ data, columns, page, rowsPerPage }) => {
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
              {columns.map(column => {
                const value = row[column.id]
                return (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={{ minWidth: 140 }}
                  >
                    {value}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
    </TableBody>
  )
}
