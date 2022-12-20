export default interface PatientRecord {
  auxId: string
  type: string
  score: number
  uid: string
  nationalId: string
  givenName: string
  familyName: string
  gender: string
  dob: Date
  phoneNumber: string
  city: string
  updatedBy: string | undefined
}
