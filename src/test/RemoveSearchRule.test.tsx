import { act, render, screen } from '@testing-library/react'
import FieldGroup from '../components/customSearch/FieldGroup'

import { ReactLocation, Route, Router } from '@tanstack/react-location'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import userEvent from '@testing-library/user-event'
import { FieldArray, Form, Formik } from 'formik'
import CustomSearch from '../components/customSearch/CustomSearch'
import SimpleSearch from '../components/search/SimpleSearch'
import SearchResult from '../components/searchResult/SearchResult'
import { AppConfigProvider } from '../hooks/useAppConfig'
import {
  CustomSearchQuery,
  SearchParameter,
  SimpleSearchQuery
} from '../types/SimpleSearch'

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

const initialSearchParameter: SearchParameter = {
  fieldName: '',
  value: '',
  distance: 0
}

const initialValues: CustomSearchQuery = {
  $or: [
    {
      parameters: [initialSearchParameter]
    }
  ],
  sortBy: 'uid',
  sortAsc: true,
  offset: 0,
  limit: 10
}

test('Delete button show when we have more than one row and it deletes search rule successfully', async () => {
  await act(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router location={location} routes={routes}>
          <AppConfigProvider>
            <Formik
              initialValues={initialValues}
              onSubmit={() => console.log('submitted')}
            >
              {({ values, handleChange, setFieldValue }) => (
                <Form>
                  <FieldArray name="$or">
                    {({ push, remove }) => (
                      <>
                        {values.$or.map(
                          (parameters: SimpleSearchQuery, index: number) => {
                            return (
                              <FieldGroup
                                values={parameters}
                                initialCustomSearchValues={{
                                  parameters: [initialSearchParameter]
                                }}
                                handleChange={handleChange}
                                fieldGroupIndex={index}
                                removeFieldGroup={remove}
                                setFieldValue={setFieldValue}
                                push={push}
                                key={index}
                              />
                            )
                          }
                        )}
                      </>
                    )}
                  </FieldArray>
                </Form>
              )}
            </Formik>
          </AppConfigProvider>
        </Router>
      </QueryClientProvider>
    )
  })

  await act(async () => {
    userEvent.click(
      await screen.findByRole('button', {
        name: 'Add Search Rule'
      })
    )
  })

  const DeleteSearchRule = await screen.findByTestId('DeleteIcon')
  expect(DeleteSearchRule).toBeInTheDocument()

  await act(async () => {
    userEvent.click(await screen.findByTestId('DeleteIcon'))
  })

  const DeletedSearchRule = screen.queryByTestId('DeleteIcon')
  expect(DeletedSearchRule).not.toBeInTheDocument()
})
