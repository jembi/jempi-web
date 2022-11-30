export default interface Notification {
  id: number
  reason: string
  patient: string
  patientId: string
  date: Date
  state: NotificationState
  linkedTo: GoldenRecord
  candidates: GoldenRecord[]
}

interface GoldenRecord {
  gID: string
  score: number
}

export enum NotificationState {
  New = 'New',
  Seen = 'Seen',
  Actioned = 'Actioned'
}
