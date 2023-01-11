import Notification, { NotificationState } from '../types/Notification'
import PatientRecord from '../types/PatientRecord'
import { User } from '../types/User'

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

const currentUser: User = {
  id: 1,
  username: 'jhon',
  email: 'jhon.doe@jembi.org',
  firstName: 'Jhon',
  lastName: 'Doe',
  provider: 'keycloak'
}

const mockData = {
  notifications,
  patientRecord,
  goldenRecords,
  patientRecords,
  currentUser
}

export default mockData
