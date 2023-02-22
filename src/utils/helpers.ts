export const isInputValid = (
  value: unknown,
  rules?: { regex: string; required: boolean }
) => {
  if (rules && typeof value === 'string') {
    const regexp = new RegExp(rules.regex || '')
    return !regexp.test(value) || (rules?.required && value.length === 0)
  }
  return false
}

export const parseSearchParams = (search: string) => {
  let query = ''
  if (search.substring(0, 1) === '?') {
    query = search.substring(1)
  }
  const queryParams = query.split('&')
  return queryParams.reduce((acc: Record<string, string>, curr: string) => {
    const param = curr.split('=')
    //check for a opening square and curly braces respectively
    if (!param[1]?.includes('%5B') && !param[1]?.includes('%7B')) {
      acc[param[0]] = param[1]
    }
    return acc
  }, {})
}
