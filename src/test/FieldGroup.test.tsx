import { act, render, screen } from '@testing-library/react'
import SearchRowTest from './SearchRowTest'

test('Field group renders successfully when called', async () => {
  act(() => {
    render(<SearchRowTest />)
  })

  act(() => {
    const element = screen.queryByText('Or')
    expect(element).not.toBeInTheDocument()
  })

  //Remove group button should not be visible when fieldGroupIndex is greater than 0
  const removeGroupButton = screen.queryByRole('button', {
    name: 'Remove group'
  })

  expect(removeGroupButton).not.toBeInTheDocument()
})
