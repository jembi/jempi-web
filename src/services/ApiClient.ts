import axios, { AxiosRequestConfig } from 'axios'
import { config } from '../config'
import AuditTrailRecord from '../types/AuditTrail'
import { Fields } from '../types/Fields'
import Notification, { NotificationState } from '../types/Notification'
import { AnyRecord, GoldenRecord, PatientRecord } from '../types/PatientRecord'
import { CustomSearchQuery, SearchQuery } from '../types/SimpleSearch'
import { OAuthParams, User } from '../types/User'
import ROUTES from './apiRoutes'
import axiosInstance from './axios'
import moxios from './mockBackend'

const client = config.shouldMockBackend ? moxios : axiosInstance

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

interface GoldenRecordResponse {
  goldenRecords: GoldenRecord[]
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

  async getPatientRecord(uid: string) {
    return await client
      .get<PatientRecord>(`${ROUTES.PATIENT_RECORD_ROUTE}/${uid}`)
      .then(res => res.data)
  }

  async getGoldenRecord(uid: string) {
    return await client
      .get<GoldenRecord>(`${ROUTES.GOLDEN_RECORD_ROUTE}/${uid}`)
      .then(res => res.data)
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
      .then(res => res.data.goldenRecords)
  }

  async getLinkedRecords(uid: string) {
    return await client
      .get<PatientRecord[]>(ROUTES.GET_LINKED_RECORDS, {
        params: {
          uid
        },
        paramsSerializer: {
          indexes: null
        }
      })
      .then(res => res.data)
  }

  //TODO Move this logic to the backend and just get match details by notification ID
  async getMatchDetails(uid: string, goldenId: string, candidates: string[]) {
    const patientRecord = this.getPatientRecord(uid)
    const goldenRecord = this.getGoldenRecords([goldenId])
    const candidateRecords = this.getGoldenRecords(candidates)
    return (await axios
      .all<any>([patientRecord, goldenRecord, candidateRecords])
      .then(response => {
        return [{ type: 'Current', ...response[0] }]
          .concat(
            response[1].map((r: AnyRecord) => {
              r.type = 'Golden'
              return r
            })
          )
          .concat(
            response[2].map((r: AnyRecord) => {
              r.type = 'Candidate'
              return r
            })
          )
      })) as AnyRecord[]
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

  async postSimpleSearchGoldenRecordQuery(request: SearchQuery) {       
    return await client
      .post(ROUTES.POST_SIMPLE_SEARCH_GOLDEN_RECORD, request)
      .then(res => res.data)
  }

  async postCustomSearchGoldenRecordQuery(request: SearchQuery) {       
    return await client
      .post(ROUTES.POST_SIMPLE_SEARCH_GOLDEN_RECORD, request)
      .then(res => res.data)
  }

  async postCustomCustomGoldenRecordQuery(request: SearchQuery) {       
    return await client
      .post(ROUTES.POST_SIMPLE_SEARCH_GOLDEN_RECORD, request)
      .then(res => res.data)
  }

  async postSimpleSearchPatientRecordQuery(request: SearchQuery) {       
    return await client
      .post(ROUTES.POST_SIMPLE_SEARCH_PATIENT_RECORD, request)
      .then(res => res.data)
  }

  async validateOAuth(oauthParams: OAuthParams) {
    return await client
      .post(ROUTES.VALIDATE_OAUTH, oauthParams)
      .then(res => res.data as User)
  }

  async getCurrentUser() {
    return await client
      .get(ROUTES.CURRENT_USER)
      .then(res => res.data)
      .catch(() => null)
  }

  async logout() {
    return await client.get(ROUTES.LOGOUT)
  }

  async updatedPatientRecord(request: PatientRecord | GoldenRecord) {
    return await client
      .post(ROUTES.UPDATE_PATIENT_RECORD, request)
      .then(res => res)
  }

  uploadFile = async (requestConfig: AxiosRequestConfig<FormData>) => {
    await client
      .post(ROUTES.UPLOAD, requestConfig.data, requestConfig)
      .then(res => res.data)
  }
  async postCustomSearchQuery(request: CustomSearchQuery) {
    return await client
      .post(ROUTES.POST_CUSTOM_SEARCH, request)
      .then(res => res.data)
  }
}

export default new ApiClient()
