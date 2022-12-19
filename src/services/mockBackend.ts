import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'
import Notification, { NotificationState } from '../types/Notification'
import PatientRecord from '../types/PatientRecord'

const moxios = axios.create()

export const axiosMockAdapterInstance = new AxiosMockAdapter(moxios, {
  delayResponse: 0
})

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
  type: 'Current',
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

axiosMockAdapterInstance
  .onGet('/MatchesForReview')
  .reply(200, { records: notifications })
  .onGet('/Document')
  .reply(200, { document: patientRecord })
  .onGet('/GoldenRecordDocuments')
  .reply(() => {
    // Unique row ids for data grid
    const records = goldenRecords.map(g => {
      g.customGoldenRecord.uid += 1
      return g
    })
    return [200, { goldenRecords: records }]
  })

export default moxios
