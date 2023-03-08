import { FieldArray, Form, Formik } from 'formik'
import { useAppConfig } from 'hooks/useAppConfig'
import moment from 'moment'
import { FC } from 'react'
import { SearchQuery } from 'types/SimpleSearch'
import { PAGINATION_LIMIT } from 'utils/constants'
import SearchRow from './SearchRow'

const SimpleSearchForm: FC<{
  onChange: (values: SearchQuery) => void
}> = ({ onChange }) => {
  const { availableFields } = useAppConfig()

  const initialValues: SearchQuery = {
    parameters: availableFields.map(({ fieldType, fieldName }) => {
      return {
        fieldName,
        value: fieldType === 'Date' ? moment().format('DD/MM/YYYY') : '',
        distance: 0
      }
    }),
    sortBy: 'uid',
    sortAsc: false,
    offset: 0,
    limit: PAGINATION_LIMIT
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => console.log('Submited')}
    >
      {({ values, handleChange }) => {
        onChange(values)
        return (
          <Form>
            <FieldArray name="refine-search">
              {() => (
                <>
                  {availableFields.map((field, index) => {
                    const parameter = values.parameters[index]
                    return (
                      parameter && (
                        <SearchRow
                          field={field}
                          parameter={parameter}
                          onChange={handleChange}
                          key={field.fieldName}
                          index={index}
                        />
                      )
                    )
                  })}
                </>
              )}
            </FieldArray>
          </Form>
        )
      }}
    </Formik>
  )
}

export default SimpleSearchForm
