export default interface SimpleSearchTextInput {
  textFieldValue: string
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
  name: string
  label: string
}
