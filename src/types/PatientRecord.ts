export interface SourceId {
  uid: string
  facility: string
  patient: String
}

export interface AnyRecord
  extends Record<
    string,
    SourceId | SourceId[] | string | number | boolean | Date | undefined | null
  > {
  auxId: string
  score: number
  uid: string
  updatedBy: string | undefined
}

export interface PatientRecord extends AnyRecord {
  sourceId: SourceId
  type?: 'Current' | 'Candidate'
}

export interface GoldenRecord extends AnyRecord {
  sourceId: SourceId[]
  type?: 'Golden'
}

export type ValueOf<T> = T[keyof T]
