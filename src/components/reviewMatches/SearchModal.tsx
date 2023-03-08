import {
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  Tab,
  Tabs,
  Typography
} from '@mui/material'
import AddFieldOrGroupButton from 'components/customSearch/AddFieldOrGroupButton'
import FieldGroup from 'components/customSearch/FieldGroup'
import SimpleSearchForm from 'components/search/SimpleSearchForm'
import { FieldArray, Form, Formik } from 'formik'
import { useAppConfig } from 'hooks/useAppConfig'
import moment from 'moment'
import { useState } from 'react'
import {
  CustomSearchQuery,
  SearchParameter,
  SearchQuery,
  SimpleSearchQuery
} from 'types/SimpleSearch'
import { PAGINATION_LIMIT } from 'utils/constants'

const style = {
  position: 'absolute',
  minWidth: '900px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center'
          }}
        >
          {children}
        </Box>
      )}
    </div>
  )
}

const SearchModal = () => {
  const { availableFields } = useAppConfig()
  const [value, setValue] = useState(0)
  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    val: number
  ) => {
    setValue(val)
  }

  const initialSearchParameter: SearchParameter = {
    fieldName: '',
    value: '',
    distance: 0
  }

  const initialValues2: CustomSearchQuery = {
    $or: [
      {
        parameters: [initialSearchParameter]
      }
    ],
    sortBy: 'uid',
    sortAsc: true,
    offset: 0,
    limit: PAGINATION_LIMIT
  }
  const initialValues: SearchQuery = {
    parameters: availableFields.map(({ fieldType, fieldName }) => {
      return {
        fieldName,
        value: fieldType === 'Date' ? moment().format('DD/MM/YYYY') : '',
        distance: 0
      }
    }),
    sortBy: 'uid',
    sortAsc: false,
    offset: 0,
    limit: PAGINATION_LIMIT
  }
  return (
    <Modal open>
      <Box sx={{ ...style }}>
        <Box sx={{ px: 3, py: 2 }}>
          <Typography lineHeight={'32px'} fontSize={'20px'} fontWeight={500}>
            Refine the current search
          </Typography>
        </Box>
        <Divider />
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="Custom search" value={0} />
          <Tab label="Simple search" value={1} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <SimpleSearchForm onChange={value => console.log(value)} />
        </TabPanel>
        <TabPanel index={1} value={value}>
          <Formik
            initialValues={initialValues2}
            onSubmit={() => console.log('Submited')}
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
                              handleChange={handleChange}
                              initialCustomSearchValues={{
                                parameters: [initialSearchParameter]
                              }}
                              fieldGroupIndex={index}
                              removeFieldGroup={remove}
                              key={index}
                              setFieldValue={setFieldValue}
                              push={push}
                            />
                          )
                        }
                      )}

                      <Grid
                        item
                        container
                        direction="column"
                        width="100%"
                        alignItems={'center'}
                        sx={{ mt: 1 }}
                      >
                        <Grid
                          item
                          container
                          direction="row"
                          width="756px"
                          justifyContent={'flex-end'}
                        >
                          <AddFieldOrGroupButton
                            onClick={push}
                            initialCustomSearchValues={{
                              parameters: [initialSearchParameter]
                            }}
                            label="Add group"
                          />
                        </Grid>
                      </Grid>
                    </>
                  )}
                </FieldArray>
              </Form>
            )}
          </Formik>
        </TabPanel>
        <Grid mb={2} px={3} container justifyContent="space-between">
          <Button>Cancel</Button>
          <Button>Refine Search</Button>
        </Grid>
      </Box>
    </Modal>
  )
}

export default SearchModal
