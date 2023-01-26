import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Grid, Typography } from '@mui/material'
import { FieldArray } from 'formik'
import { CustomSearchQuery, SearchParameter } from '../../types/SimpleSearch'
import CustomSearchRow from './CustomSearchRow'
interface FieldGroupProps {
  values: CustomSearchQuery
  handleChange: (e: React.ChangeEvent<any>) => void
  initialCustomSearchValues: SearchParameter
  fieldGroupIndex: number
  removeFieldGroup: <T>(index: number) => T | undefined
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}

const FieldGroup: React.FC<FieldGroupProps> = ({
  values,
  handleChange,
  initialCustomSearchValues,
  fieldGroupIndex,
  removeFieldGroup,
  setFieldValue
}) => {
  return (
    <Grid item container direction="column" width="100%" alignItems={'center'}>
      {fieldGroupIndex > 0 ? (
        <Grid
          item
          container
          direction={'row'}
          justifyContent={'center'}
          sx={{ mb: 2 }}
        >
          <Typography sx={{ fontWeight: 800 }}>Or</Typography>
        </Grid>
      ) : null}

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
        {fieldGroupIndex > 0 ? (
          <Grid item container direction={'row'} justifyContent={'flex-end'}>
            <Button
              variant="text"
              color={'error'}
              startIcon={<DeleteIcon />}
              sx={{ mr: 1, mt: 1, fontSize: '13px' }}
              onClick={() => {
                removeFieldGroup(fieldGroupIndex)
              }}
            >
              Remove group
            </Button>
          </Grid>
        ) : null}

        <FieldArray name={`$or[${fieldGroupIndex}]parameters`}>
          {({ push, remove }) => (
            <>
              {values.parameters.map((p: SearchParameter, index: number) => {
                const parameter = values.parameters[index]
                return (
                  <CustomSearchRow
                    parameter={parameter}
                    index={index}
                    fieldGroupIndex={fieldGroupIndex}
                    onChange={handleChange}
                    remove={remove}
                    enableCondition={index > 0}
                    enableDelete={index > 0}
                    key={index}
                    setFieldValue={setFieldValue}
                  />
                )
              })}

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
                  sx={{ fontSize: '13px' }}
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
