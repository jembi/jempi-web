export type ActionType =
  | 'newUserCreated'
  | 'grUpdate'
  | 'grAndPatientRecordLinked'
  | 'grAndPatientRecordLinkApproved'

export default interface AuditTrailRecord {
  process: string
  actionTaken: ActionType
  links: string
  when: string
  changedBy: string
  comment: string
}
