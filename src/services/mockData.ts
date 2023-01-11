import AuditTrailRecord from '../types/AuditTrail'
import Notification, { NotificationState } from '../types/Notification'
import PatientRecord from '../types/PatientRecord'

const notifications: Notification[] = [
  {
    id: '123',
    type: 'Threshold',
    created: 1605112212,
    names: 'Bob Smith',
    patient_id: 'P098',
    state: NotificationState.New,
    golden_id: 'P09833',
    score: 0.5
  }
]

const auditTrail: AuditTrailRecord[] = [
  {
    process: 'Create user',
    actionTaken: 'newUserCreated',
    links: [],
    when: '10/09/2022 8:16',
    changedBy: 'User Id 12345',
    comment: ''
  },
  {
    process: 'Auto-update golden record field',
    actionTaken: 'grUpdate',
    links: ['G543'],
    when: '11/09/2022 10:07',
    changedBy: 'System',
    comment: 'Golden ID (G543) updated field values (name, cell number)'
  },
  {
    process: 'Autolink',
    actionTaken: 'grAndPatientRecordLinked',
    links: ['G123', 'P123-1'],
    when: '12/09/2022 9:00',
    changedBy: 'System',
    comment: 'Golden ID (G123) linked with Patient ID (P123-1)'
  },
  {
    process: 'Approve link',
    actionTaken: 'grAndPatientRecordLinkApproved',
    links: ['G127', 'P127-1'],
    when: '12/09/2022 10:35',
    changedBy: 'User ID 12345',
    comment: 'Golden ID (G127) linked with Patient ID (P127-1) approved'
  }
]

const patientRecord: PatientRecord = {
  auxId: 'P066',
  type: 'Current',
  score: 0,
  uid: 'P098',
  nationalId: '123456',
  givenName: 'Bob',
  familyName: 'Smith',
  gender: 'Male',
  dob: new Date(1605522215666),
  phoneNumber: '085145855',
  city: 'Welkom',
  updatedBy: undefined
}

const goldenRecord: PatientRecord = {
  auxId: 'P077',
  type: 'Golden',
  score: 0,
  uid: 'P09833',
  nationalId: '123456',
  givenName: 'Bob',
  familyName: 'Smith',
  gender: 'Male',
  dob: new Date(1605522215666),
  phoneNumber: '085145855',
  city: 'Welkom',
  updatedBy: undefined
}

const patientRecords = [patientRecord, goldenRecord]

const goldenRecords = [{ customGoldenRecord: goldenRecord }]

const mockData = {
  notifications,
  auditTrail,
  patientRecord,
  goldenRecords,
  patientRecords
}

export default mockData
