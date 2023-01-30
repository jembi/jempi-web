export const isInputValid = (
  value: any,
  rules: { regex: string; required: boolean }
) => {
  const regexp = new RegExp(rules.regex)
  return !regexp.test(value) || (rules.required && value.length === 0)
}
