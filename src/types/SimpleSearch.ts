export interface SearchParameter {
  fieldName: string
  value: string | Date
  distance: number
}

export interface SimpleSearchQuery {
  parameters: SearchParameter[]
}
export interface CustomSearchQuery {
  $or: SimpleSearchQuery[]
  sortBy: string
  sortAsc: boolean
  offset?: number
  limit?: number
}
export interface SearchQuery {
  parameters: SearchParameter[]
  sortBy: string
  sortAsc: boolean
  offset?: number
  limit?: number
}

export enum FlagLabel {
  ALL_RECORDS = 'ALL RECORDS',
  GOLDEN_ONLY = 'GOLDEN ONLY',
  PATIENT_ONLY = 'PATIENT ONLY'
}

export interface SearchFlagsOptionsProps {
  value: number
  label: string
}
