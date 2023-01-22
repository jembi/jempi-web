import AddIcon from '@mui/icons-material/Add'
import { Button, Grid } from '@mui/material'
import { FieldArray } from 'formik'
import { CustomSearchQuery, SearchParameter } from '../../types/SimpleSearch'
import CustomSearchRow from './CustomSearchRow'

interface FieldGroupProps {
  values: CustomSearchQuery
  handleChange: (e: React.ChangeEvent<any>) => void
  initialCustomSearchValues: SearchParameter
  fieldGroup: 'or' | 'and'
}

const FieldGroup: React.FC<FieldGroupProps> = ({
  values,
  handleChange,
  initialCustomSearchValues,
  fieldGroup
}) => {
  type objectKeyType = keyof typeof values.parameters
  let objectKey: objectKeyType = fieldGroup

  return (
    <Grid item container direction="column" width="100%" alignItems={'center'}>
      <Grid
        item
        container
        direction="column"
        width="fit-content"
        alignItems={'center'}
        sx={{
          borderRadius: '4px',
          boxShadow: '0px 0px 0px 1px #E0E0E0',
          display: 'flex',
          mb: 3
        }}
      >
        <FieldArray name={`parameters.${fieldGroup}`}>
          {({ push, remove }) => (
            <>
              {values.parameters[objectKey].map(
                (p: SearchParameter, index: number) => {
                  const parameter = values.parameters.and[index]
                  return (
                    <CustomSearchRow
                      parameter={parameter}
                      index={index}
                      onChange={handleChange}
                      remove={remove}
                      enableCondition={index > 0}
                      enableDelete={index > 0}
                      key={index}
                      fieldGroup={fieldGroup}
                    />
                  )
                }
              )}

              <Grid
                item
                container
                direction={'row'}
                justifyContent={'center'}
                width="100%"
              >
                <Button
                  variant="text"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    push(initialCustomSearchValues)
                  }}
                >
                  Add Search Rule
                </Button>
              </Grid>
            </>
          )}
        </FieldArray>
      </Grid>
    </Grid>
  )
}

export default FieldGroup
