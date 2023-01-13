import axios from 'axios'
import AxiosMockAdapter from 'axios-mock-adapter'
import ROUTES from './apiRoutes'

import mockData from './mockData'
import mockFields from './mockFields'

const moxios = axios.create()

const axiosMockAdapterInstance = new AxiosMockAdapter(moxios, {
  delayResponse: 0
})

const {
  notifications,
  patientRecords,
  goldenRecords,
  auditTrail,
  currentUser
} = mockData

axiosMockAdapterInstance
  .onPost(ROUTES.VALIDATE_OAUTH)
  .reply(200, { user: currentUser })
  .onGet(ROUTES.CURRENT_USER)
  .reply(200, { user: currentUser })
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
  .onGet(ROUTES.AUDIT_TRAIL)
  .reply(200, auditTrail)

const sleep = (value: number) =>
  new Promise(resolve => setTimeout(resolve, value))

//Successful upload
axiosMockAdapterInstance.onPost(ROUTES.UPLOAD).reply(async config => {
  const total = 1024 // mocked file size
  for (const progress of [0, 0.2, 0.4, 0.6, 0.8, 1]) {
    await sleep(500)
    if (config.onUploadProgress) {
      config.onUploadProgress({ loaded: total * progress, total, bytes: total })
    }
  }
  return [200, {}]
})

// Failed upload
// axiosMockAdapterInstance.onPost(ROUTES.UPLOAD).reply(async config => {
//   const total = 1024 // mocked file size
//   for (const progress of [0, 0.2, 0.4, 0.6, 0.8, 1]) {
//     await sleep(500)
//     if (config.onUploadProgress) {
//       config.onUploadProgress({ loaded: total * progress, total, bytes: total })
//     }
//   }
//   return [500, {}]
// })

export default moxios
