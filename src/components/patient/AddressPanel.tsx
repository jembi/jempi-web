import { Paper, Typography } from '@mui/material'
import { DataGrid, GridColumns } from '@mui/x-data-grid'
import { FC } from 'react'
import { useAppConfig } from '../../hooks/useAppConfig'
import { AnyRecord } from '../../types/PatientRecord'
import { isInputValid } from '../../utils/helpers'
import DataGridCutomInput from './DataGridCutomInput'

const AddressPanel: FC<{
  data: AnyRecord
  isDataEditable: boolean
  onChange: (newRow: AnyRecord) => void
}> = ({ data, isDataEditable, onChange }) => {
  const { getFieldsByGroup } = useAppConfig()
  const columns: GridColumns = getFieldsByGroup('address').map(
    ({ fieldName, fieldLabel, readOnly, rules, formatValue }) => {
      return {
        field: fieldName,
        headerName: fieldLabel,
        flex: 1,
        valueFormatter: ({ value }) => formatValue(value),
        sortable: false,
        disableColumnMenu: true,
        editable: readOnly ? false : isDataEditable,
        preProcessEditCellProps: ({ props }) => {
          return {
            ...props,
            error: isInputValid(props.value, rules)
          }
        },
        renderEditCell: props => <DataGridCutomInput {...props} />
      }
    }
  )

  return (
    <Paper sx={{ p: 1 }}>
      <Typography variant="h6">Current Residential Address</Typography>
      <DataGrid
        getRowId={({ uid }) => uid}
        columns={columns}
        rows={[data]}
        autoHeight={true}
        hideFooter={true}
        processRowUpdate={newRow => onChange(newRow)}
        disableSelectionOnClick
      />
    </Paper>
  )
}

export default AddressPanel
