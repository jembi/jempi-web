import { SxProps, Theme } from "@mui/material"

export default interface ToggleThreeButtonType {
  selectedButton: number
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
  name?: string
  handleChange(value: any, event: React.MouseEvent<HTMLElement>): void
  button1Label: string
  button2Label: string
  button3Label: string
  distanceValue?: number
  ToggleButtonStyle: SxProps<Theme>
  exactValue?: boolean

}
