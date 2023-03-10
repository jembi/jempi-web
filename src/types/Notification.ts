export default interface Notification {
  id: string
  type: string
  reason?: string | null
  created: number
  names: string
  patient_id: string | null
  state: NotificationState
  golden_id: string
  score: number
  linkedTo?: GoldenRecord
  candidates?: GoldenRecord[]
}

export interface GoldenRecord {
  golden_id: string
  score: number
}

export enum NotificationState {
  New = 'New',
  Seen = 'Seen',
  Actioned = 'Actioned',
  Pending = 'Pending',
  Accepted = 'Accepted'
}
