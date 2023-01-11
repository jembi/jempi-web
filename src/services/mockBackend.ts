import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'
import ROUTES from './apiRoutes'

import mockData from './mockData'
import mockFields from './mockFields'

const moxios = axios.create()

const axiosMockAdapterInstance = new AxiosMockAdapter(moxios, {
  delayResponse: 0
})

const { notifications, patientRecords, goldenRecords, linkedRecords } = mockData

axiosMockAdapterInstance
  .onGet(ROUTES.GET_NOTIFICATIONS)
  .reply(200, { records: notifications })
  .onGet(ROUTES.GET_PATIENT_DOCUMENT)
  .reply(config => {
    const patient = patientRecords.find(({ uid }) => uid === config.params.uid)
    if (patient) {
      return [200, { document: patient }]
    }
    return [404, {}]
  })
  .onGet(ROUTES.GET_GOLDEN_ID_DOCUMENTS)
  .reply(() => {
    // Unique row ids for data grid
    const records = goldenRecords.map(g => {
      g.customGoldenRecord.uid += 1
      return g
    })
    return [200, { goldenRecords: records }]
  })
  .onGet(ROUTES.GET_FIELDS_CONFIG)
  .reply(200, mockFields)
  .onGet(ROUTES.GET_LINKED_RECORDS)
  .reply(200, linkedRecords)

export default moxios
