import PatientRecord, { ValueOf } from './PatientRecord'

export type FieldGroup =
  | 'none'
  | 'name'
  | 'identifiers'
  | 'registering_facility'
  | 'address'
  | 'demographics'
  | 'relationships'
  | 'sub_heading'
  | 'system'
  | 'linked_records'
  | 'audit_trail'

export type FieldType = 'String' | 'Number' | 'Date' | 'Boolean'

export interface Field {
  fieldName: string
  fieldType: FieldType
  fieldLabel: string
  groups: FieldGroup[]
  scope: string[]
  accessLevel: string[]
}

export interface DisplayField extends Field {
  formatValue: (v: ValueOf<PatientRecord>) => string | undefined
}

export type Fields = Field[]
