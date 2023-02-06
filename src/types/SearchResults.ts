export interface SearchRecord {
  auxId: string
  city: string
  dob: string
  familyName: string
  gender: string
  givenName: string
  nationalId: string
  uid: string
  phoneNumber: string
  sourceId?: string[]
}

export interface Data {
  records: {
    data: SearchRecord[],
    pagination: {
      total: number
    }
  }
}
