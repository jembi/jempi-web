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

export const PAGINATION_LIMIT = 10
