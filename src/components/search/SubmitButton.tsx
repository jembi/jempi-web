import { Button, SxProps, Theme } from '@mui/material'

interface SubmitButtonProps {
  label: string | JSX.Element
  sx?: SxProps<Theme>
  href?: string
  variant?: 'contained' | 'text' | 'outlined' | 'headerButton' | undefined
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
  size?: 'small' | 'medium' | 'large' | undefined
  disabled?: boolean
  autoFocus?: boolean
  startIcon?: JSX.Element
  className?: string
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  label,
  sx,
  href,
  variant = 'text',
  onClick,
  size,
  disabled = false,
  autoFocus = false,
  startIcon,
  className
}) => {
  return (
    <Button
      variant={variant}
      href={href}
      sx={sx}
      onClick={onClick}
      size={size}
      disabled={disabled}
      autoFocus={autoFocus}
      startIcon={startIcon}
      className={className}
    >
      {label}
    </Button>
  )
}

export default SubmitButton
