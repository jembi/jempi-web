export interface SearchParameter {
  fieldName: string
  value: string | Date
  exact: boolean
  distance: string
}
export interface fieldGroups {
  and:  SearchParameter[]
  or:  SearchParameter[]
}

export interface CustomSearchQuery {
  parameters: fieldGroups
}
export interface SearchQuery {
  parameters: SearchParameter[]
}

export enum FlagLabel {
  ALL_RECORDS = 'ALL RECORDS',
  GOLDEN_ONLY = 'GOLDEN ONLY',
  PATIENT_ONLY = 'PATIENT ONLY'
}
