import AuditTrailRecord from '../types/AuditTrail'
import Notification, { NotificationState } from '../types/Notification'
import { GoldenRecord, PatientRecord } from '../types/PatientRecord'
import { SearchResultProps, SearchResultsLinkedRecordsProps } from '../types/SearchResults'
import { User } from '../types/User'

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

const searchResult: SearchResultProps[] = [
  {
    id: 'G1001',
    firstName: 'Joe',
    lastName: 'Bernard',
    gender: 'Male'
  },
  {
    id: 'G1002',
    firstName: 'Louis',
    lastName: 'Muluer',
    gender: 'Male'
  },
  {
    id: 'G1003',
    firstName: 'Hope',
    lastName: 'Krood',
    gender: 'Female'
  },
  {
    id: 'G1004',
    firstName: 'Francine',
    lastName: 'Melechon',
    gender: 'Female'
  },
  {
    id: 'G1005',
    firstName: 'Morris',
    lastName: 'Van Der Sarr',
    gender: 'Male'
  }
]

const linkedRecord: SearchResultsLinkedRecordsProps[] = [
  {
    patient: 'G1005', 
    linkedRecords: [
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
  },
  {
    patient: 'G1004', 
    linkedRecords: [
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
  },  
  {
    patient: 'G1003', 
    linkedRecords: [
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
  },
  {
    patient: 'G1002', 
    linkedRecords: [
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
  score: 0,
  uid: 'G543',
  nationalId: '123456',
  givenName: 'Bob',
  familyName: 'Smith',
  gender: 'Male',
  dob: new Date(1605522215666),
  phoneNumber: '085145855',
  city: 'Welkom',
  updatedBy: undefined,
  sourceId: {
    facility: 'Facility One',
    uid: '0x3289',
    patient: 'xxx'
  }
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
    updatedBy: 'Dr Anthony Soprano',
    sourceId: {
      facility: 'Facility One',
      uid: '0x3289',
      patient: 'xxx'
    }
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
    updatedBy: 'Dr Carmela DeAngelis',
    sourceId: {
      facility: 'Facility Two',
      uid: '0x3288',
      patient: 'xxx'
    }
  }
]

const goldenRecord: GoldenRecord = {
  auxId: '0x77',
  score: 0,
  uid: '0x9833',
  nationalId: '123456',
  givenName: 'Bob',
  familyName: 'Smith',
  gender: 'Male',
  dob: new Date(1605522215666),
  phoneNumber: '085145855',
  city: 'Welkom',
  updatedBy: undefined,
  sourceId: [
    {
      facility: 'Facility One',
      uid: '0x3289',
      patient: 'xxx'
    },
    {
      facility: 'Facility Two',
      uid: '0x3288',
      patient: 'xxx'
    }
  ]
}

const patientRecords = [patientRecord, goldenRecord]

const goldenRecords = [{ customGoldenRecord: goldenRecord }]

const currentUser: User = {
  id: 1,
  username: 'john',
  email: 'john.doe@jembi.org',
  familyName: 'John',
  givenName: 'Doe',
  provider: 'keycloak'
}

const mockData = {
  auditTrail,
  notifications,
  patientRecord,
  goldenRecord,
  goldenRecords,
  patientRecords,
  currentUser,
  linkedRecords,
  searchResult
}

export default mockData
