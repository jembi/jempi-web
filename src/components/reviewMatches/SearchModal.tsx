import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider
} from '@mui/material'
import CustomSearchForm from 'components/customSearch/CustomSearchForm'
import SimpleSearchForm from 'components/search/SimpleSearchForm'
import { FC, useState } from 'react'
import { SEARCH_TYPE } from 'types/ReviewLink'
import {
  CustomSearchQuery,
  SearchQuery,
  ToggleButtonOptions
} from 'types/SimpleSearch'
import SearchTypeToggle from './SearchTypeToggle'

const options: ToggleButtonOptions[] = [
  { value: 0, label: 'Custom search' },
  { value: 1, label: 'Simple search' }
]

const SearchModal: FC<{
  isOpen: boolean
  onClose: () => void
  onChange: (query: SearchQuery | CustomSearchQuery | undefined) => void
}> = ({ isOpen, onClose, onChange }) => {
  const [selectedTab, setSelectedTab] = useState('Custom search')
  const [refineSearchQuery, setRefineSearchQuery] = useState<
    SearchQuery | CustomSearchQuery | undefined
  >(undefined)

  const handleClose = () => {
    onClose()
    setSelectedTab(SEARCH_TYPE.customSearch)
  }

  const onConfirmSearch = () => {
    onChange(refineSearchQuery)
    onClose()
  }

  return (
    <Dialog fullWidth maxWidth={'md'} open={isOpen}>
      <DialogContent sx={{ p: 0 }}>
        <DialogTitle>Refine the current search</DialogTitle>
        <Divider />
        <SearchTypeToggle onChange={setSelectedTab} options={options} />

        {selectedTab === SEARCH_TYPE.simpleSearch && (
          <SimpleSearchForm onChange={setRefineSearchQuery} />
        )}
        {selectedTab === SEARCH_TYPE.customSearch && (
          <Box mt={3}>
            <CustomSearchForm onChange={setRefineSearchQuery} />
          </Box>
        )}

        <DialogActions
          sx={{ display: 'flex', justifyContent: 'space-between', p: '20px' }}
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onConfirmSearch}>Refine Search</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default SearchModal
