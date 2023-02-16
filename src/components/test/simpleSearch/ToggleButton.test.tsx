import { render, screen } from '@testing-library/react'
import ToggleButtons from '../../search/ToggleButtons'
import { SxProps, Theme } from '@mui/material'

const options = [
  { value: 0, label: '0' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' }
]

const sx: SxProps<Theme> = {
  width: '129px',
  height: '42px',
  borderColor: theme => theme.palette.primary.main,
  color: theme => theme.palette.primary.main,
  '&.Mui-selected, &.Mui-selected:hover': {
    color: 'white',
    backgroundColor: theme => theme.palette.primary.main
  }
}
test('Toggle button have the correct options when rendered', () => {
  const { container } = render(
    <ToggleButtons selectedButton="1" options={options} sx={sx} />
  )
  expect(container.firstChild).toHaveTextContent('1')
})

test('Toggle button has the correct initial value when first rendered', () => {
  render(<ToggleButtons selectedButton="1" options={options} sx={sx} />)

  const linkElement = screen.getAllByText('1')
  expect(linkElement[0]).toHaveTextContent('1')
})
