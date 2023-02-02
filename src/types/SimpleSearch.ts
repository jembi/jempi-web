export interface SearchParameter {
  fieldName: string
  value: string | Date
  distance: number
}

export interface CustomSearchParameters extends SearchParameter {
  operator: string
}

export interface CustomSearchQuery {
  parameters: CustomSearchParameters[]
}
export interface SearchQuery {
  parameters: SearchParameter[]
  sortBy: string,
  sortAsc: boolean
  offset?: number
  limit?: number
}
