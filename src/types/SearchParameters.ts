export default interface SearchParameters {
  label: string
  fieldAttribute: string
  exactAttribute: string
  distanceAttribute: string
  handleChange:  React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
  textFieldValue: string
  exactValue: boolean
  distanceValue: number
  fieldName: string
  setFieldValue: Function
}

