import Notification, { NotificationState } from '../types/Notification'
import PatientRecord from '../types/PatientRecord'

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

const patientRecord: PatientRecord = {
  auxId: '0x66',
  type: 'Current',
  score: 0,
  uid: '0x98',
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
  auxId: '0x77',
  type: '',
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

const goldenRecords = [{ customGoldenRecord: goldenRecord }]

const mockData = { notifications, patientRecord, goldenRecords }

export default mockData
