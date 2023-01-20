
export default interface SearchResultProps {
  id: string
  firstName: string
  lastName: string
  gender: string
}

export interface SearchResultsWithLinkedRecordsProps extends SearchResultProps {
  linkedRecord: SearchResultProps[]
}
