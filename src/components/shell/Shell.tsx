import { useState } from 'react'

import {
  AccountCircle as AccountCircleIcon,
  Menu as MenuIcon,
  MenuOpen as MenuOpenIcon
} from '@mui/icons-material'
import { AppBar, Box, IconButton, Toolbar } from '@mui/material'

import SideBar from './SideBar'

const Shell = () => {
  const [menuOpen, setMenuOpen] = useState(true)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
    <>
      <AppBar
        position="relative"
        sx={{
          zIndex: theme => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={toggleMenu}
          >
            {(menuOpen && <MenuOpenIcon />) || <MenuIcon />}
          </IconButton>
          <Box sx={{ flexGrow: 1 }}></Box>
          <IconButton size="large" edge="end" color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <SideBar open={menuOpen} />
    </>
  )
}

export default Shell
