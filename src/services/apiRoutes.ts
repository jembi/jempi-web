const ROUTES = {
  GET_FIELDS_CONFIG: '/config',
  GET_LINKED_RECORDS: '/LinkedRecords',
  GET_NOTIFICATIONS: '/MatchesForReview',
  PATIENT_RECORD_ROUTE: '/patient-record',
  GOLDEN_RECORD_ROUTE: '/golden-record',
  GET_GOLDEN_ID_DOCUMENTS: '/GoldenRecordDocuments',
  UPDATE_NOTIFICATION: '/NotificationRequest',
  CREATE_GOLDEN_RECORD: '/Unlink',
  LINK_RECORD: '/Link',
  POST_SIMPLE_SEARCH: '/SimpleSearchRequest', //TODO: replace with the correct route.
  CURRENT_USER: '/current-user',
  VALIDATE_OAUTH: '/authenticate',
  LOGOUT: '/logout',
  AUDIT_TRAIL: '/Audit-trail',
  UPLOAD: '/Upload',
  UPDATE_PATIENT_RECORD: '/Patient'
}

export default ROUTES
