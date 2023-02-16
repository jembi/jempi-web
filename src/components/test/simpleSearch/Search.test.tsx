import { ReactLocation, Route, Router } from '@tanstack/react-location'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AppConfigProvider } from '../../../hooks/useAppConfig'
import CustomSearch from '../../customSearch/CustomSearch'
import SimpleSearch from '../../search/SimpleSearch'
import SearchResult from '../../searchResult/SearchResult'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {}
  }
})
const location = new ReactLocation()
const routes: Route[] = [
  {
    path: '',
    children: [
      {
        path: 'search',
        children: [
          {
            path: 'simple',
            element: <SimpleSearch />
          },
          {
            path: 'custom',
            element: <CustomSearch />
          }
        ]
      },
      {
        path: 'search-results',
        children: [
          {
            path: 'golden',
            element: (
              <SearchResult isGoldenRecord={true} title="Golden Records Only" />
            )
          },
          {
            path: 'patient',
            element: (
              <SearchResult
                isGoldenRecord={false}
                title="Patient Records Only"
              />
            )
          }
        ]
      }
    ]
  }
]

const renderSimpleSearch = () => {
  act(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router location={location} routes={routes}>
          <AppConfigProvider>
            <SimpleSearch />
          </AppConfigProvider>
        </Router>
      </QueryClientProvider>
    )
  })
}

test('Custom Search button exists when simple search component is rendered', async () => {
  await renderSimpleSearch()

  const linkElement = await screen.findAllByText(/Custom Search/i)
  expect(linkElement[0]).toBeInTheDocument()
})

test('Simple Search button exist when we navigate to custom search', async () => {
  await renderSimpleSearch()

  const customSearchButton = screen.getAllByRole('link', {
    name: /Custom Search/i
  })[0]

  act(() => {
    userEvent.click(customSearchButton)
  })

  expect(await screen.findByText(/Simple Search/i)).toBeInTheDocument()
})
