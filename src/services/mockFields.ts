import { Fields } from '../types/Fields'

const FIELDS_CONFIG: Fields = [
  {
    fieldName: 'type',
    fieldType: 'String',
    fieldLabel: 'Record Type',
    groups: ['demographics', 'linked_records'],
    scope: ['/patient/:uid', '/match-details', '/patient/:uid/linked-records'],
    accessLevel: []
  },
  {
    fieldName: 'uid',
    fieldType: 'String',
    fieldLabel: 'UID',
    groups: ['identifiers', 'sub_heading', 'linked_records'],
    scope: ['/patient/:uid', '/match-details', '/patient/:uid/linked-records'],
    accessLevel: []
  },
  {
    fieldName: 'nationalId',
    fieldType: 'String',
    fieldLabel: 'National ID',
    groups: ['identifiers', 'linked_records'],
    scope: [
      '/patient/:uid',
      '/match-details',
      '/search',
      '/patient/:uid/linked-records'
    ],
    accessLevel: []
  },
  {
    fieldName: 'auxId',
    fieldType: 'String',
    fieldLabel: 'AUX ID',
    groups: ['identifiers'],
    scope: ['/patient/:uid'],
    accessLevel: []
  },
  {
    fieldName: 'givenName',
    fieldType: 'String',
    fieldLabel: 'First Name',
    groups: ['name', 'demographics', 'linked_records'],
    scope: [
      '/patient/:uid',
      '/match-details',
      '/search',
      '/patient/:uid/linked-records'
    ],
    accessLevel: []
  },
  {
    fieldName: 'familyName',
    fieldType: 'String',
    fieldLabel: 'Last Name',
    groups: ['name', 'demographics', 'linked_records'],
    scope: [
      '/patient/:uid',
      '/match-details',
      '/search',
      '/patient/:uid/linked-records'
    ],
    accessLevel: []
  },
  {
    fieldName: 'gender',
    fieldType: 'String',
    fieldLabel: 'Gender',
    groups: ['demographics', 'sub_heading', 'linked_records'],
    scope: ['/patient/:uid', '/match-details', '/patient/:uid/linked-records'],
    accessLevel: []
  },
  {
    fieldName: 'dob',
    fieldType: 'Date',
    fieldLabel: 'Date of Birth',
    groups: ['demographics', 'sub_heading', 'linked_records'],
    scope: [
      '/patient/:uid',
      '/match-details',
      '/search',
      '/patient/:uid/linked-records'
    ],
    accessLevel: []
  },
  {
    fieldName: 'phoneNumber',
    fieldType: 'String',
    fieldLabel: 'Phone No',
    groups: ['demographics', 'linked_records'],
    scope: ['/patient/:uid', '/match-details', '/patient/:uid/linked-records'],
    accessLevel: []
  },
  {
    fieldName: 'city',
    fieldType: 'String',
    fieldLabel: 'City',
    groups: ['demographics', 'linked_records'],
    scope: ['/patient/:uid', '/match-details', '/patient/:uid/linked-records'],
    accessLevel: []
  },
  {
    fieldName: 'score',
    fieldType: 'Number',
    fieldLabel: 'Match',
    groups: ['none'],
    scope: ['/patient/:uid'],
    accessLevel: []
  },
  //TODO Add back when we have user information
  // {
  //   fieldName: 'updatedBy',
  //   fieldType: 'String',
  //   fieldLabel: 'Updated By',
  //   group: 'system',
  //   scope: [
  //     '/patient/:uid',
  //   ],
  //   accessLevel: []
  // }
  {
    fieldName: 'siteCode',
    fieldType: 'String',
    fieldLabel: 'Site Code',
    groups: ['registering_facility'],
    scope: ['/patient/:uid', '/patient/:uid/linked-records'],
    accessLevel: []
  },
  {
    fieldName: 'facilityName',
    fieldType: 'String',
    fieldLabel: 'Facility Name',
    groups: ['registering_facility', 'linked_records'],
    scope: ['/patient/:uid', '/patient/:uid/linked-records'],
    accessLevel: []
  },
  {
    fieldName: 'village',
    fieldType: 'String',
    fieldLabel: 'Village',
    groups: ['address'],
    scope: ['/patient/:uid'],
    accessLevel: []
  },
  {
    fieldName: 'ward',
    fieldType: 'String',
    fieldLabel: 'Ward',
    groups: ['address'],
    scope: ['/patient/:uid'],
    accessLevel: []
  },
  {
    fieldName: 'province',
    fieldType: 'String',
    fieldLabel: 'Province',
    groups: ['address'],
    scope: ['/patient/:uid'],
    accessLevel: []
  },
  {
    fieldName: 'district',
    fieldType: 'String',
    fieldLabel: 'District',
    groups: ['address'],
    scope: ['/patient/:uid'],
    accessLevel: []
  },
  {
    fieldName: 'country',
    fieldType: 'String',
    fieldLabel: 'Country',
    groups: ['address'],
    scope: ['/patient/:uid'],
    accessLevel: []
  },
  {
    fieldName: 'guardianName',
    fieldType: 'String',
    fieldLabel: 'Guardian Name',
    groups: ['relationships'],
    scope: ['/patient/:uid'],
    accessLevel: []
  }
]

export default FIELDS_CONFIG
