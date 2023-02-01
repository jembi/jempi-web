
export interface SearchResultProps {
  id: string
  firstName: string
  lastName: string
  gender: string
}

export interface SearchResultsLinkedRecordsProps{
  patient: string
  linkedRecords: SearchResultProps[]
}
