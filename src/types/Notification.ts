export default interface Notification {
  id: number
  reason: string
  patient: string
  patientId: string
  date: Date
  state: string
  linkedTo: GoldenRecord
  candidates: GoldenRecord[]
}

interface GoldenRecord {
  gID: string
  score: number
}
