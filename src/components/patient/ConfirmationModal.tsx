import { Box, Button, Modal, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { UpdatedFields } from './PatientDetails'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24
}

const columns = [
  {
    field: 'field',
    headerName: 'Field',
    flex: 1
  },
  {
    field: 'original',
    headerName: 'Original',
    flex: 1
  },
  {
    field: 'new',
    headerName: 'New',
    flex: 1
  }
]

const ConfirmationModal: React.FC<{
  isVisible: boolean
  handleClose: () => void
  onConfirm: () => void
  updatedFields: UpdatedFields[]
}> = ({ isVisible, handleClose, updatedFields, onConfirm }) => {
  return (
    <Modal
      open={isVisible}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        id="modal-description"
        sx={{
          ...style,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          '& .new': {
            color: '#FF6F00'
          }
        }}
      >
        <Box p={2}>
          <Typography
            id="parent-modal-title"
            fontStyle="normal"
            fontWeight={400}
            fontSize={24}
            lineHeight={'133.4%'}
          >
            Confirm Golden Record Changes
          </Typography>
        </Box>
        <DataGrid
          getRowId={({ id }) => id}
          columns={columns}
          rows={updatedFields}
          autoHeight={true}
          hideFooter={true}
          getCellClassName={params => (params.field === 'new' ? 'new' : '')}
        />
        <Box
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end'
          }}
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ConfirmationModal
