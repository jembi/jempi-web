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
  patientRecord,
  goldenRecord,
  goldenRecords,
  auditTrail,
  currentUser,
  searchGoldenRecordResult,
  searchPatientRecordResult
} = mockData

axiosMockAdapterInstance
  .onPost(ROUTES.VALIDATE_OAUTH)
  .reply(200, currentUser)
  .onGet(ROUTES.CURRENT_USER)
  .reply(200, currentUser)
  .onGet(ROUTES.GET_NOTIFICATIONS)
  .reply(200, { records: notifications })
  .onGet(new RegExp(`^${ROUTES.PATIENT_RECORD_ROUTE}/[A-z0-9]+$`))
  .reply(config => {
    const id = config.url?.split('/').pop()
    if (patientRecord.uid === id) {
      return [200, patientRecord]
    }
    return [404, {}]
  })
  .onGet(new RegExp(`^${ROUTES.GOLDEN_RECORD_ROUTE}/[A-z0-9]+$`))
  .reply(config => {
    const id = config.url?.split('/').pop()
    if (goldenRecord.customGoldenRecord.uid === id) {
      return [200, goldenRecord]
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
  .onPost(`${ROUTES.POST_SIMPLE_SEARCH}/golden`)
  .reply(200, searchGoldenRecordResult)
  .onPost(`${ROUTES.POST_SIMPLE_SEARCH}/patient`)
  .reply(200, searchPatientRecordResult)
  .onPost(`${ROUTES.POST_CUSTOM_SEARCH}/golden`)
  .reply(200, searchGoldenRecordResult)
  .onPost(`${ROUTES.POST_CUSTOM_SEARCH}/patient`)
  .reply(200, searchPatientRecordResult)

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
