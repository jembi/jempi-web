import { Grid } from '@mui/material'
import { useState } from 'react'
import { SearchFlagsOptionsProps } from '../../types/SimpleSearch'
import ToggleButtons from './ToggleButtons'

interface SearchFlagsProps {
  options: SearchFlagsOptionsProps[]
  setisGoldenRecord: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchFlags: React.FC<SearchFlagsProps> = ({ options, setisGoldenRecord }) => {
  const [selectedButton, setSelectedButton] = useState<string>('0')

  const handleChange = (event: React.ChangeEvent<any>) => {

   setSelectedButton(event?.target.value)
   if(event?.target.value === '0'){
    setisGoldenRecord(true)
   }
   else{
    setisGoldenRecord(false)
   }
  }

  return (
    <Grid container direction={'row'} justifyContent={'flex-end'}>
      <Grid item>
        <ToggleButtons
          selectedButton={selectedButton}
          onChange={handleChange}
          sx={{
            width: '129px',
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
  )
}

export default SearchFlags
