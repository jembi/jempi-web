import { Fields } from '../types/Fields'

export enum ACTIONS {
  newnewUserCreated,
  grUpdate,
  grAndPatientRecordLinked,
  grAndPatientRecordLinkApproved
}

export const ACTION_TYPE: { [key: string]: string } = {
  [ACTIONS.newnewUserCreated]: 'New user created',
  [ACTIONS.grUpdate]: 'GR updated',
  [ACTIONS.grAndPatientRecordLinked]: 'GR and Patient record linked',
  [ACTIONS.grAndPatientRecordLinkApproved]:
    'GR and Patient record link approved'
}

export const AUDIT_TRAIL_FIELDS: Fields = [
  {
    fieldName: 'process',
    fieldType: 'String',
    fieldLabel: 'Process',
    groups: ['audit_trail'],
    scope: ['/patient/:uid', '/patient/:uid/audit-trail'],
    accessLevel: []
  },
  {
    fieldName: 'actionTaken',
    fieldType: 'String',
    fieldLabel: 'Action taken',
    groups: ['audit_trail'],
    scope: ['/patient/:uid', '/patient/:uid/audit-trail'],
    accessLevel: []
  },
  {
    fieldName: 'links',
    fieldType: 'String',
    fieldLabel: 'Links',
    groups: ['audit_trail'],
    scope: ['/patient/:uid', '/patient/:uid/audit-trail'],
    accessLevel: []
  },
  {
    fieldName: 'when',
    fieldType: 'Date',
    fieldLabel: 'When',
    groups: ['audit_trail'],
    scope: ['/patient/:uid', '/patient/:uid/audit-trail'],
    accessLevel: []
  },
  {
    fieldName: 'changedBy',
    fieldType: 'String',
    fieldLabel: 'Changed by',
    groups: ['audit_trail'],
    scope: ['/patient/:uid', '/patient/:uid/audit-trail'],
    accessLevel: []
  },
  {
    fieldName: 'comment',
    fieldType: 'String',
    fieldLabel: 'Comment',
    groups: ['audit_trail'],
    scope: ['/patient/:uid', '/patient/:uid/audit-trail'],
    accessLevel: []
  }
]
