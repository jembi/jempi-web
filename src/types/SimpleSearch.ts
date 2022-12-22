export interface Parameters {
  field: string
  value: string | Date
  exact: boolean
  distance: number
}

export interface Search {
  parameters: Parameters[]
}
