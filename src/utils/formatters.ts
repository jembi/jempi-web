import moment from 'moment'
import { FieldType } from '../types/Fields'
import { AnyRecord, ValueOf } from '../types/PatientRecord'

export const formatDate = (value: any) => {
  return moment(value).format('YYYY-MM-DD')
}

export const getFieldValueFormatter = (type: FieldType) => {
  return (value: ValueOf<AnyRecord>): string | undefined => {
    switch (type) {
      case 'Date':
        return formatDate(value)
      default:
        return value?.toString()
    }
  }
}
