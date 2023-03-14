import { Box, Button, Divider, Grid, Modal, Typography } from '@mui/material'
import CustomSearchForm from 'components/customSearch/CustomSearchForm'
import SimpleSearchForm from 'components/search/SimpleSearchForm'
import { FC, useCallback, useState } from 'react'
import {
  CustomSearchQuery,
  SearchQuery,
  ToggleOptionsProps
} from 'types/SimpleSearch'
import SearchTypeToggle from './SearchTypeToggle'

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

const options: ToggleOptionsProps[] = [
  { value: 0, label: 'Custom search' },
  { value: 1, label: 'Simple search' }
]

const SearchModal: FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const [tabValue, setTabValue] = useState('custom-search')
  const [refineSearchQuerry, setRefineSearchQuerry] = useState<
    SearchQuery | CustomSearchQuery | undefined
  >(undefined)

  const onSearchQuerryChange = useCallback(
    (value: SearchQuery | CustomSearchQuery) => {
      setRefineSearchQuerry(value)
    },
    []
  )

  return (
    <Modal open={isOpen} onClose={() => onClose()}>
      <Box sx={{ ...style }}>
        <Box sx={{ px: 3, py: 2 }}>
          <Typography lineHeight={'32px'} fontSize={'20px'} fontWeight={500}>
            Refine the current search
          </Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            height: '500px',
            overflowY: 'scroll'
          }}
        >
          <SearchTypeToggle onChange={setTabValue} options={options} />

          {tabValue === 'simple-search' && (
            <SimpleSearchForm onChange={value => onSearchQuerryChange(value)} />
          )}
          {tabValue === 'custom-search' && (
            <Box mt={3}>
              <CustomSearchForm
                onChange={value => onSearchQuerryChange(value)}
              />
            </Box>
          )}
        </Box>

        <Grid mb={2} px={3} container justifyContent="space-between">
          <Button>Cancel</Button>
          <Button>Refine Search</Button>
        </Grid>
      </Box>
    </Modal>
  )
}

export default SearchModal
