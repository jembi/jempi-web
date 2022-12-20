export default interface PatientRecord
  extends Record<string, string | number | boolean | Date | undefined | null> {
  auxId: string
  type: 'Golden' | 'Candidate'
  score: number
  uid: string
  updatedBy: string | undefined
}
