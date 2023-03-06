import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid
} from '@mui/material'
import Button from 'components/shared/Button'
import { useState } from 'react'
import CustomSearch from '../customSearch/CustomSearch'
import SimpleSearch from '../search/SimpleSearch'
import ToggleButtons from '../search/ToggleButtons'

interface RefineSearchModalProps {
  onOpen: boolean
  onCancel: () => void
}

const RefineSearchModal: React.FC<RefineSearchModalProps> = ({
  onOpen,
  onCancel
}) => {
  const options = [
    { value: 0, label: 'Custom Search' },
    { value: 1, label: 'Simple Search' }
  ]
  const [selectedButton, setSelectedButton] = useState<string>('0')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedButton(event?.target.value)
  }

  return (
    <Dialog open={onOpen} onClose={onCancel} maxWidth="lg">
      <DialogTitle>Refine the current search</DialogTitle>
      <Divider />
      <DialogContent>
        <Container>
          <Grid container direction="row" justifyContent={'center'}>
            <Grid item>
              <ToggleButtons
                selectedButton={selectedButton}
                onChange={handleChange}
                sx={{
                  height: '42px',
                  borderColor: theme => theme.palette.primary.main,
                  color: theme => theme.palette.primary.main,
                  '&.Mui-selected, &.Mui-selected:hover': {
                    color: 'white',
                    backgroundColor: theme => theme.palette.primary.main
                  }
                }}
                options={options}
              />
            </Grid>
          </Grid>
          {selectedButton === '1' ? (
            <SimpleSearch modal={true} />
          ) : (
            <CustomSearch modal={true} />
          )}
        </Container>
      </DialogContent>
      <DialogActions>
        <Container>
          <Grid container direction="row" justifyContent={'flex-start'}>
            <Grid item sx={{ flexGrow: 1 }}>
              <Button onClick={onCancel}>Cancel</Button>
            </Grid>
            <Grid item>
              <Button>Refine Search</Button>
            </Grid>
          </Grid>
        </Container>
      </DialogActions>
    </Dialog>
  )
}

export default RefineSearchModal
