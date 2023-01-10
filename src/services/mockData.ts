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

const mockData = { notifications, patientRecord, goldenRecords, patientRecords }

export default mockData
