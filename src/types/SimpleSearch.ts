export interface SearchParameter {
  fieldName: string
  value: string | Date
  exact: boolean
  distance: number
}

export interface SearchQuery {
  parameters: SearchParameter[]
}
