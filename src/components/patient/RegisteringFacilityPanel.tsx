import { Paper, Typography } from '@mui/material'
import { DataGrid, GridColumns } from '@mui/x-data-grid'
import { FC } from 'react'
import { useAppConfig } from '../../hooks/useAppConfig'
import { GoldenRecord, PatientRecord } from '../../types/PatientRecord'
import DataGridCutomInput from './DataGridCutomInput'

const RegisteringFacilityPanel: FC<{
  data: PatientRecord | GoldenRecord
  isEditable: boolean
  onChange: (newRow: PatientRecord | GoldenRecord) => any
}> = ({ data, isEditable, onChange }) => {
  const { getFieldsByGroup } = useAppConfig()
  const columns: GridColumns = getFieldsByGroup('registering_facility').map(
    ({ fieldName, fieldLabel, readOnly, isValid, formatValue }) => {
      return {
        field: fieldName,
        headerName: fieldLabel,
        flex: 1,
        valueFormatter: ({ value }) => formatValue(value),
        sortable: false,
        disableColumnMenu: true,
        editable: readOnly ? false : isEditable,
        // a Callback used to validate the user's input
        preProcessEditCellProps: ({ props }) => {
          return {
            ...props,
            error: !isValid(props.value)
          }
        },
        renderEditCell: props => <DataGridCutomInput {...props} />
      }
    }
  )

  return (
    <Paper sx={{ p: 1 }}>
      <Typography variant="h6">Registering Facility</Typography>
      <DataGrid
        getRowId={({ uid }) => uid}
        columns={columns}
        rows={[data]}
        autoHeight={true}
        hideFooter={true}
        experimentalFeatures={{ newEditingApi: true }}
        processRowUpdate={newRow => onChange(newRow)}
        disableSelectionOnClick
      />
    </Paper>
  )
}

export default RegisteringFacilityPanel
