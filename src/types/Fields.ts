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

export type FieldType = 'String' | 'Number' | 'Date' | 'Boolean'

export type Field = {
  fieldName: string
  fieldType: FieldType
  fieldLabel: string
  groups: FieldGroup[]
  scope: string[]
  accessLevel: string[]
}

export type Fields = Field[]
