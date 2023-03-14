import { debounce } from '@mui/material'
import { useFormikContext } from 'formik'
import React, { useCallback } from 'react'

const SubmitListener = () => {
  const formik = useFormikContext()
  const [lastValues, updateState] = React.useState(formik.values)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const submitForm = useCallback(
    debounce((): void => {
      formik.submitForm()
    }, 500),
    []
  )

  React.useEffect(() => {
    const valuesEqualLastValues =
      JSON.stringify(lastValues) === JSON.stringify(formik.values)
    const valuesEqualInitialValues =
      JSON.stringify(formik.initialValues) === JSON.stringify(formik.values)

    if (!valuesEqualLastValues) {
      updateState(formik.values)
    }

    if (!valuesEqualLastValues && !valuesEqualInitialValues && formik.isValid) {
      submitForm()
    }
  }, [
    formik.values,
    formik.isValid,
    lastValues,
    formik.initialValues,
    submitForm
  ])

  return null
}

export default SubmitListener
