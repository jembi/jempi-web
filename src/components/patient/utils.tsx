import { Tooltip } from '@mui/material'
import { GridEditInputCell, GridRenderEditCellParams } from '@mui/x-data-grid'

export const EditInputCell = (props: GridRenderEditCellParams) => {
  const { error } = props

  return (
    <Tooltip open={!!error} title={error}>
      <GridEditInputCell {...props} />
    </Tooltip>
  )
}

export const handleError = (
  regex: string,
  required: boolean,
  fieldValue: any,
  fieldTitle: string
) => {
  const regexp = new RegExp(regex)
  if (!regexp.test(fieldValue)) {
    return `field value for ${fieldTitle} doesn't match correct format`
  }
  if (required && fieldValue.length === 0) {
    return `field value for ${fieldTitle} is required`
  }
  return ''
}
