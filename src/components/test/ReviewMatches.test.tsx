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

test('Match details must successfully render when we click review matches button', async () => {
  act(() => {
    render(<App />)
  })

  userEvent.click(await screen.findByRole('link', { name: /Review Matches/i }))

  expect(screen.getByText(/Review Matches/i)).toBeInTheDocument()
})
