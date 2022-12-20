import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'
import ROUTES from './apiRoutes'

import mockData from './mockData'

const moxios = axios.create()

const axiosMockAdapterInstance = new AxiosMockAdapter(moxios, {
  delayResponse: 0
})

const { notifications, patientRecord, goldenRecords } = mockData

axiosMockAdapterInstance
  .onGet(ROUTES.GET_NOTIFICATIONS)
  .reply(200, { records: notifications })
  .onGet(ROUTES.GET_PATIENT_DOCUMENT)
  .reply(200, { document: patientRecord })
  .onGet(ROUTES.GET_GOLDEN_ID_DOCUMENTS)
  .reply(() => {
    // Unique row ids for data grid
    const records = goldenRecords.map(g => {
      g.customGoldenRecord.uid += 1
      return g
    })
    return [200, { goldenRecords: records }]
  })

export default moxios
