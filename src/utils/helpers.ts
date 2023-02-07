export const isInputValid = (
  value: any,
  rules?: { regex: string; required: boolean }
) => {
  if (rules) {
    const regexp = new RegExp(rules.regex || '')
    return !regexp.test(value) || (rules?.required && value.length === 0)
  }
  return false
}
