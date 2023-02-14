import axios, { AxiosRequestConfig } from 'axios'
import { config } from '../config'
import AuditTrailRecord from '../types/AuditTrail'
import { FieldChangeReq, Fields } from '../types/Fields'
import Notification, { NotificationState } from '../types/Notification'
import { AnyRecord, GoldenRecord, PatientRecord } from '../types/PatientRecord'
import {
  ApiSearchResult,
  CustomSearchQuery,
  SearchQuery
} from '../types/SimpleSearch'
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
      .then((data: any) => {
        return {
          ...data.customGoldenRecord,
          linkRecords: data.mpiEntityList.map(
            (entityItem: any) => entityItem.entity
          )
        }
      })
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
      .then(res =>
        res.data.goldenRecords.map((data: any) => {
          return data.customGoldenRecord
        })
      )
  }

  //TODO Move this logic to the backend and just get match details by notification ID
  async getMatchDetails(uid: string, goldenId: string, candidates: string[]) {
    if (uid === null || typeof uid === 'undefined') {
      return [] as AnyRecord[]
    }
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

  async searchQuery(
    request: CustomSearchQuery | SearchQuery,
    isGoldenOnly: boolean
  ) {
    const isCustomSearch = '$or' in request
    const endpoint = `${
      isCustomSearch ? ROUTES.POST_CUSTOM_SEARCH : ROUTES.POST_SIMPLE_SEARCH
    }/${isGoldenOnly ? 'golden' : 'patient'}`
    return await client.post(endpoint, request).then(res => {
      if (isGoldenOnly) {
        const { pagination, data } = res.data.records
        const result: ApiSearchResult = {
          records: {
            data: data.map((d: any) => {
              return {
                ...d.customGoldenRecord,
                linkRecords: d.mpiEntityList.map(
                  (entityItem: any) => entityItem.entity
                )
              }
            }),
            pagination: {
              total: pagination.total
            }
          }
        }
        return result
      } else {
        return res.data
      }
    })
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

  async updatedPatientRecord(uid: string, request: FieldChangeReq) {
    return await client
      .post(`${ROUTES.UPDATE_PATIENT_RECORD}/${uid}`, request)
      .then(res => res)
  }

  async updatedGoldenRecord(uid: string, request: FieldChangeReq) {
    return await client
      .patch(`${ROUTES.UPDATE_GOLDEN_RECORD}/${uid}`, request)
      .then(res => res)
  }

  uploadFile = async (requestConfig: AxiosRequestConfig<FormData>) => {
    await client
      .post(ROUTES.UPLOAD, requestConfig.data, requestConfig)
      .then(res => res.data)
  }
}

export default new ApiClient()
