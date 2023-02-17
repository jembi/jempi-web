import FieldGroup from '../components/customSearch/FieldGroup'
import { act, render, screen } from '@testing-library/react'

import { ReactLocation, Route, Router } from '@tanstack/react-location'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppConfigProvider } from '../hooks/useAppConfig'
import CustomSearch from '../components/customSearch/CustomSearch'
import SimpleSearch from '../components/search/SimpleSearch'
import SearchResult from '../components/searchResult/SearchResult'
import { Formik } from 'formik'

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

const handleChange = (e: React.ChangeEvent<any>) => {
  console.log('handled change')
}

const removeFieldGroup = (index: number) => {
  console.log('Removed field group')

  return undefined
}

const setFieldValue = (
  field: string,
  value: any,
  shouldValidate?: boolean | undefined
) => {
  console.log(
    `set value ${value} for field ${field} validate: ${shouldValidate}`
  )
}

const push = (obj: any) => {
  console.log(`pushed object: ${JSON.stringify(obj)}`)
}
test('Field group renders successfully when called', async () => {
  act(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router location={location} routes={routes}>
          <AppConfigProvider>
            <Formik
              initialValues={{
                parameters: [
                  {
                    fieldName: 'firstName',
                    value: 'Lumiere',
                    distance: 1
                  }
                ]
              }}
              onSubmit={() => console.log('submitted')}
            >
              <FieldGroup
                values={{
                  parameters: [
                    {
                      fieldName: 'firstName',
                      value: 'Lumiere',
                      distance: 1
                    }
                  ]
                }}
                initialCustomSearchValues={{
                  parameters: [
                    {
                      fieldName: 'firstName',
                      value: 'Lumiere',
                      distance: 1
                    }
                  ]
                }}
                handleChange={handleChange}
                fieldGroupIndex={1}
                removeFieldGroup={removeFieldGroup}
                setFieldValue={setFieldValue}
                push={push}
              />
            </Formik>
          </AppConfigProvider>
        </Router>
      </QueryClientProvider>
    )
  })

  const element = await screen.findAllByText('Or')
  expect(element[0]).toBeInTheDocument()

  //Remove group button should be visible when fieldGroupIndex is greater than 0
  const removeGroupButton = await screen.findByRole('button', {
    name: 'Remove group'
  })

  expect(removeGroupButton).toBeInTheDocument()
})
