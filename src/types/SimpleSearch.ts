import { AnyRecord } from './PatientRecord'

export interface SearchParameter {
  fieldName: string
  value: string | Date
  distance: number
}

export interface SimpleSearchQuery {
  parameters: SearchParameter[]
}

export interface BaseSearchQuery {
  sortBy: string
  sortAsc: boolean
  offset: number
  limit: number
}

export interface CustomSearchQuery extends BaseSearchQuery {
  $or: SimpleSearchQuery[]
}
export interface SearchQuery extends BaseSearchQuery {
  parameters: SearchParameter[]
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

export interface ApiSearchResult {
  records: {
    data: AnyRecord[]
    pagination: {
      total: number
    }
  }
}
