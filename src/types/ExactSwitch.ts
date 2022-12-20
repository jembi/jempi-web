export default interface SimpleSearchExactSwitch {
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
  name: string
  exactValue: boolean
}
