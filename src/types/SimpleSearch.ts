export interface SearchParameter {
  fieldName: string
  value: string | Date
  distance: number
}

export interface CustomSearchQuery {
  parameters: SearchParameter[]
}
export interface fieldGroups {
  fieldGroups: CustomSearchQuery[]
}
export interface SearchQuery {
  parameters: SearchParameter[]
}

export enum FlagLabel {
  ALL_RECORDS = 'ALL RECORDS',
  GOLDEN_ONLY = 'GOLDEN ONLY',
  PATIENT_ONLY = 'PATIENT ONLY'
}
