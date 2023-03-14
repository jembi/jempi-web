import { Grid } from '@mui/material'
import SubmitListener from 'components/shared/AutoSubmit'
import { FieldArray, Form, Formik } from 'formik'
import { FC } from 'react'
import {
  CustomSearchQuery,
  SearchParameter,
  SimpleSearchQuery
} from 'types/SimpleSearch'
import { PAGINATION_LIMIT } from 'utils/constants'
import AddFieldOrGroupButton from './AddFieldOrGroupButton'
import FieldGroup from './FieldGroup'

const CustomSearchForm: FC<{
  onChange: (values: CustomSearchQuery) => void
}> = ({ onChange }) => {
  const initialSearchParameter: SearchParameter = {
    fieldName: '',
    value: '',
    distance: 0
  }

  const initialValues: CustomSearchQuery = {
    $or: [
      {
        parameters: [initialSearchParameter]
      }
    ],
    sortBy: 'uid',
    sortAsc: true,
    offset: 0,
    limit: PAGINATION_LIMIT
  }
  return (
    <Formik initialValues={initialValues} onSubmit={values => onChange(values)}>
      {({ values, handleChange, setFieldValue }) => {
        return (
          <Form>
            <FieldArray name="$or">
              {({ push, remove }) => (
                <>
                  {values.$or.map(
                    (parameters: SimpleSearchQuery, index: number) => {
                      return (
                        <FieldGroup
                          values={parameters}
                          handleChange={handleChange}
                          initialCustomSearchValues={{
                            parameters: [initialSearchParameter]
                          }}
                          fieldGroupIndex={index}
                          removeFieldGroup={remove}
                          key={index}
                          setFieldValue={setFieldValue}
                          push={push}
                        />
                      )
                    }
                  )}

                  <Grid
                    item
                    container
                    direction="column"
                    width="100%"
                    alignItems={'center'}
                    sx={{ mt: 1 }}
                  >
                    <Grid
                      item
                      container
                      direction="row"
                      width="756px"
                      justifyContent={'flex-end'}
                    >
                      <AddFieldOrGroupButton
                        onClick={push}
                        initialCustomSearchValues={{
                          parameters: [initialSearchParameter]
                        }}
                        label="Add group"
                      />
                    </Grid>
                  </Grid>
                </>
              )}
            </FieldArray>
            <SubmitListener />
          </Form>
        )
      }}
    </Formik>
  )
}

export default CustomSearchForm
