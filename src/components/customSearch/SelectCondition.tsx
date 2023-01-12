import { useState } from 'react'
import ToggleButtons from '../search/ToggleButtons'

interface SelectConditionProps {
  onChange?: (event: React.ChangeEvent<any>, value: any) => void
  name: string
  value: string
}
const SelectCondition: React.FC<SelectConditionProps> = ({
  onChange,
  name,
}) => {
  const [selectedButton, setSelectedButton] = useState<number>(1)

  const handleChange = (event: React.ChangeEvent<any>) => {
    setSelectedButton(event.target.value)
    onChange && onChange(event, event.target.value)
  }
  return (
    <ToggleButtons
      selectedButton={selectedButton}
      onChange={handleChange}
      sx={{
        width: '50px',
        borderColor: theme => theme.palette.primary.main,
        color: theme => theme.palette.primary.main,
        '&.Mui-selected, &.Mui-selected:hover': {
          color: 'white',
          backgroundColor: theme => theme.palette.primary.main
        }
      }}
      options={['AND', 'OR', 'NOT']}
      name={name}
    />
  )
}

export default SelectCondition
