import AddIcon from '@mui/icons-material/Add'
import { Button } from '@mui/material'
import { SearchParameter } from '../../types/SimpleSearch'

interface AddFieldOrGroupButtonProps {
  onClick: (obj: { parameters: Array<SearchParameter> }) => void
  initialCustomSearchValues: { parameters: Array<SearchParameter> }
  label: string
}
const AddFieldOrGroupButton: React.FC<AddFieldOrGroupButtonProps> = ({
  onClick,
  initialCustomSearchValues,
  label
}) => {
  return (
    <Button
      variant="text"
      startIcon={<AddIcon />}
      onClick={() => {
        onClick(initialCustomSearchValues)
      }}
      sx={{ fontSize: '13px' }}
    >
      {label}
    </Button>
  )
}

export default AddFieldOrGroupButton
