import {
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter
} from '@mui/x-data-grid'

const DataGridToolBar = () => {
  return (
    <GridToolbarContainer sx={{ p: 2 }}>
      <GridToolbarQuickFilter />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  )
}

export default DataGridToolBar
