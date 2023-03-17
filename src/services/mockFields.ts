import { Fields } from '../types/Fields'

const FIELDS_CONFIG: Fields = [
  {
    fieldName: 'recordType',
    fieldType: 'String',
    fieldLabel: 'Record Type',
    groups: ['identifiers', 'linked_records'],
    scope: ['/notifications/match-details'],
    accessLevel: [],
    readOnly: true,
    rules: { required: false, regex: '.*' }
  },
  {
    fieldName: 'uid',
    fieldType: 'String',
    fieldLabel: 'UID',
    groups: ['identifiers', 'sub_heading', 'linked_records'],
    scope: [
      '/patient-record/:uid',
      '/golden-record/:uid',
      '/notifications/match-details',
      '/golden-record/:uid/linked-records',
      '/search-results/golden',
      '/search-results/patient'
    ],
    accessLevel: [],
    readOnly: true,
    rules: { required: false, regex: '.*' }
  },
  {
    fieldName: 'facilityId',
    fieldType: 'String',
    fieldLabel: 'Facility ID',
    groups: ['identifiers', 'linked_records'],
    scope: ['/notifications/match-details'],
    accessLevel: [],
    readOnly: true,
    rules: { required: false, regex: '.*' }
  },
  {
    fieldName: 'patientId',
    fieldType: 'String',
    fieldLabel: 'Patient ID',
    groups: ['identifiers', 'linked_records'],
    scope: ['/notifications/match-details'],
    accessLevel: [],
    readOnly: true,
    rules: { required: false, regex: '.*' }
  },
  {
    fieldName: 'nationalId',
    fieldType: 'String',
    fieldLabel: 'National ID',
    groups: ['identifiers', 'demographics', 'linked_records'],
    scope: [
      '/patient-record/:uid',
      '/golden-record/:uid',
      '/notifications/match-details',
      '/golden-record/:uid/linked-records',
      '/search/simple',
      '/search/custom',
      '/search-results/golden',
      '/search-results/patient'
    ],
    accessLevel: [],
    readOnly: false,
    rules: { required: true, regex: '.*' }
  },
  {
    fieldName: 'auxId',
    fieldType: 'String',
    fieldLabel: 'AUX ID',
    groups: ['identifiers'],
    scope: ['/patient-record/:uid', '/golden-record/:uid', '/search/custom'],
    accessLevel: [],
    readOnly: false,
    rules: { required: true, regex: '.*' }
  },
  {
    fieldName: 'givenName',
    fieldType: 'String',
    fieldLabel: 'First Name',
    groups: ['name', 'demographics', 'linked_records'],
    scope: [
      '/patient-record/:uid',
      '/golden-record/:uid',
      '/notifications/match-details',
      '/golden-record/:uid/linked-records',
      '/golden-record/:uid/audit-trail',
      '/search/simple',
      '/search/custom',
      '/search-results/golden',
      '/search-results/patient'
    ],
    accessLevel: [],
    readOnly: false,
    rules: { required: true, regex: '.*' }
  },
  {
    fieldName: 'familyName',
    fieldType: 'String',
    fieldLabel: 'Last Name',
    groups: ['name', 'demographics', 'linked_records'],
    scope: [
      '/patient-record/:uid',
      '/golden-record/:uid',
      '/notifications/match-details',
      '/golden-record/:uid/linked-records',
      '/golden-record/:uid/audit-trail',
      '/search/simple',
      '/search/custom',
      '/search-results/golden',
      '/search-results/patient'
    ],
    accessLevel: [],
    readOnly: false,
    rules: { required: true, regex: '.*' }
  },
  {
    fieldName: 'gender',
    fieldType: 'String',
    fieldLabel: 'Gender',
    groups: ['demographics', 'sub_heading', 'linked_records'],
    scope: [
      '/patient-record/:uid',
      '/golden-record/:uid',
      '/notifications/match-details',
      '/golden-record/:uid/linked-records',
      '/search/custom'
    ],
    accessLevel: [],
    readOnly: false,
    rules: { required: false, regex: '.*' }
  },
  {
    fieldName: 'dob',
    fieldType: 'Date',
    fieldLabel: 'Date of Birth',
    groups: ['demographics', 'sub_heading', 'linked_records'],
    scope: [
      '/patient-record/:uid',
      '/golden-record/:uid',
      '/notifications/match-details',
      '/search/simple',
      '/search/custom',
      '/search-results/golden',
      '/search-results/patient'
    ],
    accessLevel: [],
    readOnly: false,
    rules: { required: true, regex: '.*' }
  },
  {
    fieldName: 'phoneNumber',
    fieldType: 'String',
    fieldLabel: 'Phone No',
    groups: ['demographics', 'linked_records'],
    scope: [
      '/patient-record/:uid',
      '/golden-record/:uid',
      '/notifications/match-details',
      '/golden-record/:uid/linked-records',
      '/search/custom'
    ],
    accessLevel: [],
    readOnly: false,
    rules: { required: false, regex: '.*' }
  },
  {
    fieldName: 'city',
    fieldType: 'String',
    fieldLabel: 'City',
    groups: ['demographics', 'linked_records'],
    scope: [
      '/patient-record/:uid',
      '/golden-record/:uid',
      '/notifications/match-details',
      '/golden-record/:uid/linked-records',
      '/search/custom'
    ],
    accessLevel: [],
    readOnly: false,
    rules: { required: false, regex: '.*' }
  },
  //TODO Add back when we have user information
  {
    fieldName: 'updated',
    fieldType: 'String',
    fieldLabel: 'Updated',
    groups: ['system'],
    accessLevel: [],
    readOnly: false,
    scope: ['/notifications/match-details']
  },
  {
    fieldName: 'score',
    fieldType: 'Number',
    fieldLabel: 'Score',
    groups: ['none'],
    scope: [
      '/patient-record/:uid',
      '/golden-record/:uid',
      '/notifications/match-details'
    ],
    accessLevel: [],
    readOnly: false,
    rules: { required: false, regex: '.*' }
  },
  {
    fieldName: 'sourceId',
    fieldType: 'SourceId',
    fieldLabel: 'Site Code',
    groups: ['registering_facility'],
    scope: [
      '/patient-record/:uid',
      '/golden-record/:uid',
      '/golden-record/:uid/linked-records'
    ],
    accessLevel: [],
    readOnly: true
  },
  {
    fieldName: 'village',
    fieldType: 'String',
    fieldLabel: 'Village',
    groups: ['address'],
    scope: ['/patient-record/:uid', '/golden-record/:uid'],
    accessLevel: [],
    readOnly: false,
    rules: { required: false, regex: '.*' }
  },
  {
    fieldName: 'ward',
    fieldType: 'String',
    fieldLabel: 'Ward',
    groups: ['address'],
    scope: ['/patient-record/:uid', '/golden-record/:uid'],
    accessLevel: [],
    readOnly: false,
    rules: { required: false, regex: '.*' }
  },
  {
    fieldName: 'province',
    fieldType: 'String',
    fieldLabel: 'Province',
    groups: ['address'],
    scope: ['/patient-record/:uid', '/golden-record/:uid'],
    accessLevel: [],
    readOnly: false,
    rules: { required: false, regex: '.*' }
  },
  {
    fieldName: 'district',
    fieldType: 'String',
    fieldLabel: 'District',
    groups: ['address'],
    scope: ['/patient-record/:uid', '/golden-record/:uid'],
    accessLevel: [],
    readOnly: false,
    rules: { required: false, regex: '.*' }
  },
  {
    fieldName: 'country',
    fieldType: 'String',
    fieldLabel: 'Country',
    groups: ['address'],
    scope: ['/patient-record/:uid', '/golden-record/:uid'],
    accessLevel: [],
    readOnly: false,
    rules: { required: false, regex: '.*' }
  },
  {
    fieldName: 'guardianName',
    fieldType: 'String',
    fieldLabel: 'Guardian Name',
    groups: ['relationships'],
    scope: ['/patient-record/:uid', '/golden-record/:uid'],
    accessLevel: [],
    readOnly: false,
    rules: { required: false, regex: '.*' }
  }
]

export default FIELDS_CONFIG
