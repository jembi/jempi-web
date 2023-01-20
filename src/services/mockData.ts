import AuditTrailRecord from '../types/AuditTrail'
import Notification, { NotificationState } from '../types/Notification'
import PatientRecord from '../types/PatientRecord'
import {SearchResultsWithLinkedRecordsProps} from '../types/SearchResults'

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

const searchResult: SearchResultsWithLinkedRecordsProps[] = [
  {
    id: 'G1001',
    firstName: 'Joe',
    lastName: 'Bernard',
    gender: 'Male',
    linkedRecord: [
      {
        id: 'G1010',
        firstName: 'Bob',
        lastName: 'Shallow',
        gender: 'Male',
      },
      {
        id: 'G1011',
        firstName: 'Kondo',
        lastName: 'Mandanda',
        gender: 'Male',
      },
      {
        id: 'G1012',
        firstName: 'Asir',
        lastName: 'Ahle',
        gender: 'Male',
      }
    ]
  },
  {
    id: 'G1002',
    firstName: 'Louis',
    lastName: 'Muluer',
    gender: 'Male',
    linkedRecord: [
      {
        id: 'N5056',
        firstName: 'Ndoyi',
        lastName: 'Kerk',
        gender: 'Male',
      },
      {
        id: 'J3250',
        firstName: 'Fab',
        lastName: 'Lucious',
        gender: 'Male',
      },
      {
        id: 'J3250',
        firstName: 'Mongando',
        lastName: 'Sibole',
        gender: 'Male',
      }
    ]
  },
  {
    id: 'G1003',
    firstName: 'Hope',
    lastName: 'Krood',
    gender: 'Female',
    linkedRecord: [
      {
        id: 'G1001',
        firstName: 'Barton',
        lastName: 'Manjde',
        gender: 'Male',
      },
      {
        id: 'J3250',
        firstName: 'Filo',
        lastName: 'Lodi',
        gender: 'Male',
      },
      {
        id: 'G1001',
        firstName: 'Mais',
        lastName: 'Cependant',
        gender: 'Male',
      }
    ]
  },
  {
    id: 'G1004',
    firstName: 'Francine',
    lastName: 'Melechon',
    gender: 'Female',
    linkedRecord: [
      {
        id: 'G1001',
        firstName: 'Yango',
        lastName: 'Ndoyi',
        gender: 'Male',
      },
      {
        id: 'J3250',
        firstName: 'Mukondo',
        lastName: 'David',
        gender: 'Male',
      },
      {
        id: 'G1001',
        firstName: 'Okay',
        lastName: 'Demain',
        gender: 'Male',
      }
    ]
  },
  {
    id: 'G1005',
    firstName: 'Morris',
    lastName: 'Van Der Sarr',
    gender: 'Male',
    linkedRecord: [
      {
        id: 'G1001',
        firstName: 'Surpris',
        lastName: 'Beacoup',
        gender: 'Male',
      },
      {
        id: 'G1001',
        firstName: 'Titche',
        lastName: 'Efula',
        gender: 'Male',
      },
      {
        id: 'G1001',
        firstName: 'Maintenant',
        lastName: 'Jamais',
        gender: 'Male',
      }
    ]
  }
]

const auditTrail: AuditTrailRecord[] = [
  {
    process: 'Create user',
    actionTaken: 'newUserCreated',
    links: [],
    when: '10/09/2022 8:16',
    changedBy: 'User Id 12345',
    comment: ''
  },
  {
    process: 'Auto-update golden record field',
    actionTaken: 'grUpdate',
    links: ['G543'],
    when: '11/09/2022 10:07',
    changedBy: 'System',
    comment: 'Golden ID (G543) updated field values (name, cell number)'
  },
  {
    process: 'Autolink',
    actionTaken: 'grAndPatientRecordLinked',
    links: ['G543', 'P09833'],
    when: '12/09/2022 9:00',
    changedBy: 'System',
    comment: 'Golden ID (G543) linked with Patient ID (P09833)'
  },
  {
    process: 'Approve link',
    actionTaken: 'grAndPatientRecordLinkApproved',
    links: ['G543', 'P09833'],
    when: '12/09/2022 10:35',
    changedBy: 'User ID 12345',
    comment: 'Golden ID (G543) linked with Patient ID (P09833) approved'
  }
]

const patientRecord: PatientRecord = {
  auxId: '0x66',
  type: 'Current',
  score: 0,
  uid: 'G543',
  nationalId: '123456',
  givenName: 'Bob',
  familyName: 'Smith',
  gender: 'Male',
  dob: new Date(1605522215666),
  phoneNumber: '085145855',
  city: 'Welkom',
  updatedBy: undefined
}

const linkedRecords: PatientRecord[] = [
  {
    auxId: '0x66',
    type: 'Current',
    source: 'clinic A',
    score: 0,
    uid: '0x98',
    nationalId: '123456',
    givenName: 'Christopher',
    familyName: 'Moltisanti',
    gender: 'Male',
    dob: new Date(1605522215666),
    phoneNumber: '085145855',
    city: 'Welkom',
    updatedBy: 'Dr Anthony Soprano'
  },
  {
    auxId: '0x66',
    type: 'Current',
    score: 0,
    uid: '0x98',
    nationalId: '123456',
    givenName: 'Chris',
    familyName: 'Moltisanti',
    gender: 'Male',
    dob: new Date(1605522215666),
    phoneNumber: '085145855',
    city: 'Jersey',
    updatedBy: 'Dr Carmela DeAngelis'
  }
]

const goldenRecord: PatientRecord = {
  auxId: '0x77',
  type: 'Golden',
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

const patientRecords = [patientRecord, goldenRecord]

const goldenRecords = [{ customGoldenRecord: goldenRecord }]

const mockData = {
  notifications,
  patientRecord,
  goldenRecords,
  patientRecords,
  linkedRecords,
  auditTrail,
  searchResult
}

export default mockData
