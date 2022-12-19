export type FieldGroup =
  | 'none'
  | 'name'
  | 'identifiers'
  | 'registering_facility'
  | 'address'
  | 'demographics'
  | 'relationships'
  | 'system'

export type Field = {
  fieldName: string
  fieldType: 'String' | 'Number' | 'Date' | 'Boolean'
  fieldLabel: string
  groups: FieldGroup[]
  scope: string[]
  accessLevel: string[]
}

export type Fields = Field[]
