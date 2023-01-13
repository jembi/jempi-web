import AuditTrailRecord from '../types/AuditTrail'
import Notification, { NotificationState } from '../types/Notification'
import PatientRecord from '../types/PatientRecord'
import { User } from '../types/User'

const notifications: Notification[] = [
  {
    id: '123',
    type: 'Threshold',
    created: 1605112212,
    names: 'Bob Smith',
    patient_id: '0x5a',
    state: NotificationState.New,
    golden_id: '0x45',
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
    links: ['G543', 'P09833'],
    when: '12/09/2022 9:00',
    changedBy: 'System',
    comment: 'Golden ID (G543) linked with Patient ID (P09833)'
  },
  {
    process: 'Approve link',
    actionTaken: 'grAndPatientRecordLinkApproved',
    links: ['G543', 'P09833'],
    when: '12/09/2022 10:35',
    changedBy: 'User ID 12345',
    comment: 'Golden ID (G543) linked with Patient ID (P09833) approved'
  }
]

const patientRecord: PatientRecord = {
  auxId: '0x66',
  type: 'Current',
  score: 0,
  uid: 'G543',
  nationalId: '123456',
  givenName: 'Bob',
  familyName: 'Smith',
  gender: 'Male',
  dob: new Date(1605522215666),
  phoneNumber: '085145855',
  city: 'Welkom',
  updatedBy: undefined
}

const linkedRecords: PatientRecord[] = [
  {
    auxId: '0x66',
    type: 'Current',
    source: 'clinic A',
    score: 0,
    uid: '0x98',
    nationalId: '123456',
    givenName: 'Christopher',
    familyName: 'Moltisanti',
    gender: 'Male',
    dob: new Date(1605522215666),
    phoneNumber: '085145855',
    city: 'Welkom',
    updatedBy: 'Dr Anthony Soprano'
  },
  {
    auxId: '0x66',
    type: 'Current',
    score: 0,
    uid: '0x98',
    nationalId: '123456',
    givenName: 'Chris',
    familyName: 'Moltisanti',
    gender: 'Male',
    dob: new Date(1605522215666),
    phoneNumber: '085145855',
    city: 'Jersey',
    updatedBy: 'Dr Carmela DeAngelis'
  }
]

const goldenRecord: PatientRecord = {
  auxId: '0x77',
  type: 'Golden',
  score: 0,
  uid: '0x9833',
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

const currentUser: User = {
  id: 1,
  username: 'jhon',
  email: 'jhon.doe@jembi.org',
  firstName: 'Jhon',
  lastName: 'Doe',
  provider: 'keycloak'
}

const mockData = {
  auditTrail,
  notifications,
  patientRecord,
  goldenRecords,
  patientRecords,
  currentUser,
  linkedRecords
}

export default mockData
