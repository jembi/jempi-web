export interface SearchParameter {
  fieldName: string
  value: string | Date
  distance: string
}

export interface CustomSearchParameters extends SearchParameter {
  operator: string
}

export interface CustomSearchQuery {
  parameters: CustomSearchParameters[]
}
export interface SearchQuery {
  parameters: SearchParameter[]
}
