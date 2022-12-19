import { Paper, Typography } from '@mui/material'
import { DataGrid, GridColumns } from '@mui/x-data-grid'
import { FC } from 'react'
import { useAppConfig } from '../../hooks/useAppConfig'
import PatientRecord from '../../types/PatientRecord'

const RelationshipPanel: FC<{ data: PatientRecord }> = ({ data }) => {
  const { getFieldsByGroup } = useAppConfig()
  const columns: GridColumns = getFieldsByGroup('relationships').map(
    ({ fieldName, fieldLabel }) => {
      return {
        field: fieldName,
        headerName: fieldLabel
      }
    }
  )

  return (
    <Paper sx={{ p: 1 }}>
      <Typography variant="h6">Relationship Contacts</Typography>
      <DataGrid
        getRowId={({ uid }) => uid}
        columns={columns}
        rows={[data]}
        autoHeight={true}
        hideFooter={true}
      />
    </Paper>
  )
}

export default RelationshipPanel
