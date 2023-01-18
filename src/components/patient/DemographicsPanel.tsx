import { Paper, Typography } from '@mui/material'
import { DataGrid, GridColumns } from '@mui/x-data-grid'
import { FC } from 'react'
import { useAppConfig } from '../../hooks/useAppConfig'
import PatientRecord from '../../types/PatientRecord'

const DemographicsPanel: FC<{
  data: PatientRecord
  isDataEditable: boolean
  onChange: (newRow: PatientRecord) => void
}> = ({ data, isDataEditable, onChange }) => {
  const { getFieldsByGroup } = useAppConfig()
  const columns: GridColumns = getFieldsByGroup('demographics').map(
    ({ fieldName, fieldLabel, formatValue }) => {
      return {
        field: fieldName,
        headerName: fieldLabel,
        flex: 1,
        valueFormatter: ({ value }) => formatValue(value),
        sortable: false,
        disableColumnMenu: true,
        editable: isDataEditable
      }
    }
  )

  const onRowUpdate = (newRow: PatientRecord, _oldRow: PatientRecord) => {
    onChange(newRow)
    return newRow
  }

  return (
    <Paper sx={{ p: 1 }}>
      <Typography variant="h6">Demographics</Typography>
      <DataGrid
        getRowId={({ uid }) => uid}
        columns={columns}
        rows={[data]}
        autoHeight={true}
        hideFooter={true}
        processRowUpdate={(newRow, oldRow) => onRowUpdate(newRow, oldRow)}
        // TO-DO: handle errors
        onProcessRowUpdateError={e => console.log(e)}
      />
    </Paper>
  )
}

export default DemographicsPanel
