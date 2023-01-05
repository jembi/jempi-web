import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import React from 'react'

export interface Column {
  id: 'process' | 'actionTaken' | 'links' | 'when' | 'changedBy' | 'comment'
  label: string
  minWidth?: number
  align?: 'right' | 'left'
  format?: (value: number) => string
}

export const TableHeader: React.FC<{ columns: readonly Column[] }> = ({
  columns
}) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map(column => (
          <TableCell
            key={column.id}
            align={column.align}
            sx={{ backgroundColor: '#F3F3F3' }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
