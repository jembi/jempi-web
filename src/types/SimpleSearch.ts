import { SxProps, Theme } from "@mui/material"

export default interface SearchParameters {
  label: string
  fieldAttribute: string
  exactAttribute: string
  distanceAttribute: string
  handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
  textFieldValue: string | Date
  exactValue: boolean
  distanceValue: number
  fieldName: string
  setFieldValue: Function
}

export interface SimpleSearchExactSwitch {
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
  name: string
  exactValue: boolean
}


export interface SimpleSearchFuzzyMatch {
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
  name: string
  exactValue: boolean
  distanceValue: number
  setFieldValue: Function
}

export interface SimpleSearchTextInput {
  textFieldValue: string | Date
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
  name: string
  label: string
}

export interface SimpleSearchDateInput {
  name: string
  label: string
  textFieldValue: string | Date
  setFieldValue: Function
}

export interface ToggleCustomBbuttonType {
  selectedButton: number
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
  name?: string
  handleChange(value: any, event: React.MouseEvent<HTMLElement>): void
  range: string[]
  distanceValue?: number
  ToggleButtonStyle: SxProps<Theme>
  exactValue?: boolean

}


export interface Parameters {
  field: string
  value: string | Date
  exact: boolean
  distance: number
}

export interface Search {
  parameters: Parameters[]
}
