import axios from 'axios'
import Notification, { NotificationState } from '../types/Notification'
import PatientRecord from '../types/PatientRecord'

//TODO Change to real URL when available
const ROUTES = {
  GET_NOTIFICATIONS:
    'https://api.mockaroo.com/api/ea593b70?count=23&key=98d3ce00',
  GET_PATIENT_DOCUMENT:
    'https://api.mockaroo.com/api/0e76bdc0?count=1&key=98d3ce00',
  GET_GOLDEN_ID_DOCUMENTS:
    'https://api.mockaroo.com/api/70ec1680?count=1&key=98d3ce00',
  UPDATE_NOTIFICATION: 'https://jsonplaceholder.typicode.com/posts',
  CREATE_GOLDEN_RECORD: 'https://jsonplaceholder.typicode.com/posts',
  LINK_RECORD: 'https://jsonplaceholder.typicode.com/posts'
}

interface NotificationRequest {
  notificationId: string
  state: NotificationState
}

interface LinkRequest {
  goldenID: string
  docID: string
  newGoldenID?: string
}

class ApiClient {
  async getMatches() {
    return await axios
      .get<Notification[]>(ROUTES.GET_NOTIFICATIONS)
      .then(res => res.data)
  }

  async getPatient(uid: string) {
    return await axios
      .get<PatientRecord>(ROUTES.GET_PATIENT_DOCUMENT, { params: { uid } })
      .then(res => res.data)
  }

  async getGoldenRecords(uid: string[]) {
    return await axios
      .get<PatientRecord[]>(ROUTES.GET_GOLDEN_ID_DOCUMENTS, { params: { uid } })
      .then(res => res.data)
  }

  //TODO Move this logic to the backend and just get match details by notification ID
  async getMatchDetails(uid: string, goldenId: string, candidates: string[]) {
    const patientRecord = this.getPatient(uid)
    const goldenRecord = this.getGoldenRecords([goldenId])
    const candidateRecords = this.getGoldenRecords(candidates)

    return (await axios
      .all<any>([patientRecord, goldenRecord, candidateRecords])
      .then(response =>
        [response[0]].concat(response[1]).concat(response[2])
      )) as PatientRecord[]
  }

  async updateNotification(request: NotificationRequest) {
    return await axios
      .post(ROUTES.UPDATE_NOTIFICATION, request)
      .then(res => res.data)
  }

  async newGoldenRecord(request: LinkRequest) {
    return await axios
      .post(ROUTES.CREATE_GOLDEN_RECORD, request)
      .then(res => res.data)
  }

  async linkRecord(request: LinkRequest) {
    return await axios.post(ROUTES.LINK_RECORD, request).then(res => res.data)
  }
}

export default new ApiClient()
