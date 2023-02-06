export interface CustomGoldenRecord {
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


export interface MpiEntityList {
  entity: CustomGoldenRecord
}

export interface PatientRecord {

    customGoldenRecord: CustomGoldenRecord
    mpiEntityList: MpiEntityList[]

}

export interface Data {
  records: {
    data: PatientRecord[],
    pagination: {
      total: number
    }
  }
}
