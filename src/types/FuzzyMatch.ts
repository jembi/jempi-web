export default interface SimpleSearchFuzzyMatch {
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
  name: string
  exactValue: boolean
  distanceValue: number
  setFieldValue: Function
}
