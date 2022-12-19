export default interface PatientRecord
  extends Record<string, string | number | boolean | Date | undefined | null> {
  auxId: string
  type: string
  score: number
  uid: string
  updatedBy: string | undefined
}
