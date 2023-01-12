export interface SearchParameter {
  fieldName: string
  value: string | Date
  exact: boolean
  distance: number
}

export interface CustomSearchParameters extends SearchParameter {
  condition: string
}

export interface CustomSearchQuery {
  parameters: CustomSearchParameters[]
}
export interface SearchQuery {
  parameters: SearchParameter[]
}
