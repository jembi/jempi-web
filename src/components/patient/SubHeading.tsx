import {
  CalendarMonth as CalendarIcon,
  CircleOutlined as CircleOutlinedIcon,
  Person as PersonIcon,
  Star as StarIcon
} from '@mui/icons-material'
import { Chip, Stack } from '@mui/material'
import { FC } from 'react'

import { useAppConfig } from '../../hooks/useAppConfig'
import { FieldType } from '../../types/Fields'
import PatientRecord from '../../types/PatientRecord'

const getIconByFieldType = (type: FieldType) => {
  switch (type) {
    case 'Date':
      return CalendarIcon
    case 'String':
    default:
      return PersonIcon
  }
}

const SubHeading: FC<{ data: PatientRecord }> = ({ data }) => {
  const { getFieldsByGroup } = useAppConfig()
  const chips = getFieldsByGroup('sub_heading')
    .filter(({ fieldName }) => fieldName in data)
    .map(({ fieldName, fieldType }) => {
      return {
        label: data[fieldName]?.toString(),
        Icon: getIconByFieldType(fieldType)
      }
    })

  const isGoldenRecord = data.type === 'Golden'

  return (
    <Stack direction="row" spacing={1} sx={{ my: 3 }}>
      <Chip
        icon={isGoldenRecord ? <StarIcon /> : <CircleOutlinedIcon />}
        label={data.uid}
        color={isGoldenRecord ? 'primary' : 'default'}
      />
      {chips.map(({ label, Icon }) => (
        <Chip icon={<Icon />} label={label} />
      ))}
    </Stack>
  )
}

export default SubHeading
