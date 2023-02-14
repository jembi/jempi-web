import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Search as SearchIcon
} from '@mui/icons-material'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { AppBar, Box, Toolbar } from '@mui/material'
import CustomButton from '../search/CustomButton'
import JembiLogo from './JembiLogo'
import NavigationMenu from './NavigationMenu'

const colorGradient =
  'linear-gradient(90.05deg, #8BF280 -4.51%, #3B826B -4.5%, #58AB73 99.95%)'

const NavigationBar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <JembiLogo />
        <Box sx={{ flexGrow: 1 }}>
          <CustomButton
            href="/"
            startIcon={<DashboardIcon />}
            sx={{ color: theme => theme.palette.text.primary }}
            label="Dashboard"
          />
          <CustomButton
            href="/search/simple"
            startIcon={<SearchIcon />}
            sx={{ color: theme => theme.palette.text.primary }}
            label="Search"
          />
          <CustomButton
            href="/review-matches"
            startIcon={<PeopleIcon />}
            sx={{ color: theme => theme.palette.text.primary }}
            label="Matches"
          />
          <CustomButton
            href="/import"
            startIcon={<UploadFileIcon />}
            sx={{ color: theme => theme.palette.text.primary }}
            label="IMPORT"
          />
        </Box>
        <NavigationMenu />
      </Toolbar>
      <Box
        sx={{
          background: colorGradient,
          height: 12
        }}
      />
    </AppBar>
  )
}

export default NavigationBar
