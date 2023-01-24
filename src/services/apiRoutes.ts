const ROUTES = {
  GET_FIELDS_CONFIG: '/config',
  GET_LINKED_RECORDS: '/LinkedRecords',
  GET_NOTIFICATIONS: '/MatchesForReview',
  GET_PATIENT_DOCUMENT: '/Document',
  GET_GOLDEN_ID_DOCUMENTS: '/GoldenRecordDocuments',
  UPDATE_NOTIFICATION: '/NotificationRequest',
  CREATE_GOLDEN_RECORD: '/Unlink',
  LINK_RECORD: '/Link',
  POST_SIMPLE_SEARCH: '/SimpleSearchRequest', //TODO: replace with the correct route.
  CURRENT_USER: '/CurrentUser',
  VALIDATE_OAUTH: '/ValidateOAuth',
  AUDIT_TRAIL: '/Audit-trail',
  UPLOAD: '/Upload',
  POST_CUSTOM_SEARCH: '/CustomSearchRequest'
}

export default ROUTES
