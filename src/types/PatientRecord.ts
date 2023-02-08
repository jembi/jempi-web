export interface SourceId {
  uid: string
  facility: string
  patient: String
}

export interface AnyRecord
  extends Record<
    string,
    | SourceId
    | SourceId[]
    | PatientRecord[]
    | string
    | number
    | boolean
    | Date
    | undefined
    | null
  > {
  score?: number
  uid: string
  updatedBy?: string
}

export interface PatientRecord extends AnyRecord {
  sourceId: SourceId
  type?: 'Current' | 'Candidate'
}

export interface GoldenRecord extends AnyRecord {
  sourceId: SourceId[]
  linkRecords?: PatientRecord[]
  type?: 'Golden'
}

export type ValueOf<T> = T[keyof T]
