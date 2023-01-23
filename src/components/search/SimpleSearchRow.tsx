import { Grid } from '@mui/material'
import { DisplayField } from '../../types/Fields'
import { SearchParameter } from '../../types/SimpleSearch'
import SearchDateInput from './SearchDateInput'
import SearchTextInput from './SearchTextInput'

interface SimpleSearchRowProps {
  field: DisplayField
  parameter: SearchParameter
  index: number
  onChange?: (e: React.ChangeEvent<any>) => void
}

const SimpleSearchRow: React.FC<SimpleSearchRowProps> = ({
  field,
  parameter,
  index,
  onChange
}) => {
  return (
    <Grid
      item
      container
      direction="row"
      alignItems="center"
      width="fit-content"
      sx={{ mb: 1 }}
    >
      <Grid item>
        {field.fieldType === 'Date' ? (
          <SearchDateInput
            label={field.fieldLabel}
            value={parameter.value}
            onChange={onChange}
            name={`parameters[${index}].value`}
            sx={{width: 400}}
            size='small'
          />
        ) : (
          <SearchTextInput
            label={field.fieldLabel}
            value={parameter.value}
            onChange={onChange}
            name={`parameters[${index}].value`}
            sx={{width: 400}}
            size='small'
          />
        )}
      </Grid>
    </Grid>
  )
}

export default SimpleSearchRow
