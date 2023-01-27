import { Button } from '@mui/material'
import { SearchParameter } from '../../types/SimpleSearch'
import AddIcon from '@mui/icons-material/Add'

interface AddFieldOrGroupButtonProps {
  push: (obj: any) => void
  initialCustomSearchValues: SearchParameter
  label: string
}
const AddFieldOrGroupButton: React.FC<any> = ({
  push,
  initialCustomSearchValues,
  label
}) => {
  return (
    <>
      <Button
        variant="text"
        startIcon={<AddIcon />}
        onClick={() => {
          push(initialCustomSearchValues)
        }}
        sx={{ fontSize: '13px' }}
      >
        {label}
      </Button>
    </>
  )
}

export default AddFieldOrGroupButton
