export default interface PatientRecord {
  id: number
  type: string
  match: number
  uid: string
  identifiers: string
  firstName: string
  lastName: string
  gender: string
  dob: Date
  phoneNo: string
  city: string
  updatedBy: string
}
