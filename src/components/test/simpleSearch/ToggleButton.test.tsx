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
test('Have content 1 when passed as an option label', () => {
  const { container } = render(
    <ToggleButtons selectedButton="1" options={options} sx={sx} />
  )
  expect(container.firstChild).toHaveTextContent('1')
})

test('Have option one when passed as the initial selected value', () => {
  render(<ToggleButtons selectedButton="1" options={options} sx={sx} />)

  const linkElement = screen.getAllByText('1')
  expect(linkElement[0]).toHaveTextContent('1')
})
