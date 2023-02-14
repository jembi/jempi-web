import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../App'

test('Search button Exist when home component is rendered', async () => {
  await act(() => {
    render(<App />)
  })
  const linkElement = await screen.findAllByText(/Search/i)
  expect(linkElement[0]).toBeInTheDocument()
})

test('Simple Search must successfully render when we click search button', async () => {
  act(() => {
    render(<App />)
  })
  userEvent.click(await screen.findByRole('link', { name: /Import/i }))
  expect(await screen.findByRole('button', { name: /Upload/i })).toBeEnabled
})
