import FilterListIcon from '@mui/icons-material/FilterList'
import { Button } from '@mui/material'
import { GridToolbarContainer } from '@mui/x-data-grid'
import SearchSelectField from 'components/search/SearchSelectField'
import SearchTextInput from 'components/search/SearchTextInput'
import { Formik } from 'formik'
import { FC } from 'react'

const DataGridToolBar: FC = () => {
  return (
    <GridToolbarContainer
      sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'baseLine' }}
    >
      <Formik initialValues={{}} onSubmit={() => console.log('Submited')}>
        {({ values, handleChange }) => (
          <>
            <SearchTextInput
              value={''}
              name="search"
              label="Search"
              size="medium"
              index={0}
              sx={null}
            />
            <SearchSelectField
              index={0}
              onChange={undefined}
              fieldName={''}
              options={[]}
              title="Reason"
              name="reason"
              isCustomRow={false}
            />
            <Button
              sx={{ borderRadius: 8, minWidth: '32px', alignSelf: 'center' }}
            >
              <FilterListIcon />
            </Button>
          </>
        )}
      </Formik>
    </GridToolbarContainer>
  )
}

export default DataGridToolBar
