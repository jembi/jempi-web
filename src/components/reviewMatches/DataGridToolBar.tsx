import { GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid'
import { FC } from 'react'

const DataGridToolbar: FC = () => {
  return (
    <GridToolbarContainer
      sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'baseLine' }}
    >
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  )
}

export default DataGridToolbar
