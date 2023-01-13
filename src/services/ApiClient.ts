import axios, { AxiosRequestConfig } from 'axios'
import { config } from '../config'
import AuditTrailRecord from '../types/AuditTrail'
import { Fields } from '../types/Fields'
import Notification, { NotificationState } from '../types/Notification'
import PatientRecord from '../types/PatientRecord'
import { SearchQuery } from '../types/SimpleSearch'
import { OAuthParams, User } from '../types/User'
import ROUTES from './apiRoutes'
import moxios from './mockBackend'

const client = config.shouldMockBackend
  ? moxios
  : axios.create({
      baseURL: config.apiUrl || 'http://localhost:50000/JeMPI'
    })

interface NotificationRequest {
  notificationId: string
  state: NotificationState
}

interface LinkRequest {
  goldenID: string
  docID: string
  newGoldenID?: string
}

interface NotificationResponse {
  records: Notification[]
}

interface PatientRecordResponse {
  document: PatientRecord
}

interface CustomGoldenRecord {
  customGoldenRecord: PatientRecord
}

interface GoldenRecordResponse {
  goldenRecords: CustomGoldenRecord[]
}

class ApiClient {
  async getFields() {
    return await client
      .get<Fields>(ROUTES.GET_FIELDS_CONFIG)
      .then(res => res.data)
  }

  async getMatches() {
    return await client
      .get<NotificationResponse>(ROUTES.GET_NOTIFICATIONS)
      .then(res => res.data.records)
  }

  async getAuditTrail() {
    return await client
      .get<AuditTrailRecord[]>(ROUTES.AUDIT_TRAIL)
      .then(res => res.data)
  }

  async getPatient(uid: string) {
    return await client
      .get<PatientRecordResponse>(ROUTES.GET_PATIENT_DOCUMENT, {
        params: { uid }
      })
      .then(res => res.data.document)
  }

  async getGoldenRecords(uid: string[]) {
    const uids = uid?.map(u => '0x' + parseInt(u).toString(16))
    return await client
      .get<GoldenRecordResponse>(ROUTES.GET_GOLDEN_ID_DOCUMENTS, {
        params: {
          uid: uids
        },
        paramsSerializer: {
          indexes: null
        }
      })
      .then(res => res.data.goldenRecords.map(gr => gr.customGoldenRecord))
  }

  //TODO Move this logic to the backend and just get match details by notification ID
  async getMatchDetails(uid: string, goldenId: string, candidates: string[]) {
    const patientRecord = this.getPatient(uid)
    const goldenRecord = this.getGoldenRecords([goldenId])
    const candidateRecords = this.getGoldenRecords(candidates)
    return (await axios
      .all<any>([patientRecord, goldenRecord, candidateRecords])
      .then(response => {
        return [{ type: 'Current', ...response[0] }]
          .concat(
            response[1].map((r: PatientRecord) => {
              r.type = 'Golden'
              return r
            })
          )
          .concat(
            response[2].map((r: PatientRecord) => {
              r.type = 'Candidate'
              return r
            })
          )
      })) as PatientRecord[]
  }

  async updateNotification(request: NotificationRequest) {
    return await client
      .post(ROUTES.UPDATE_NOTIFICATION, request)
      .then(res => res.data)
  }

  async newGoldenRecord(request: LinkRequest) {
    return await client
      .patch(
        `${ROUTES.CREATE_GOLDEN_RECORD}?goldenID=${request.goldenID}&docID=${request.docID}`
      )
      .then(res => res.data)
  }

  async linkRecord(request: LinkRequest) {
    return await client
      .patch(
        `${ROUTES.LINK_RECORD}?goldenID=${request.goldenID}&newGoldenID=${request.newGoldenID}&docID=${request.docID}&score=2`
      )
      .then(res => res.data)
  }

  async postSimpleSearchQuery(request: SearchQuery) {
    return await client
      .post(ROUTES.POST_SIMPLE_SEARCH, request)
      .then(res => res.data)
  }

  async validateOAuth(oauthParams: OAuthParams) {
    return await client
      .post(ROUTES.VALIDATE_OAUTH, oauthParams)
      .then(res => res.data as { user: User })
  }

  async getCurrentUser() {
    return await client.get(ROUTES.CURRENT_USER).then(res => res.data)
  }
  uploadFile = async (requestConfig: AxiosRequestConfig<FormData>) => {
    await client
      .post(ROUTES.UPLOAD, requestConfig.data, requestConfig)
      .then(res => res.data)
  }
}

export default new ApiClient()
