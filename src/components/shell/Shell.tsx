import { useState } from 'react'

import {
  AccountCircle as AccountCircleIcon,
  Menu as MenuIcon,
  MenuOpen as MenuOpenIcon
} from '@mui/icons-material'
import { AppBar, Box, IconButton, Toolbar } from '@mui/material'

import SideBar from './SideBar'
import { Outlet } from '@tanstack/react-location'
import { ReactLocationDevtools } from '@tanstack/react-location-devtools'

const Shell = () => {
  const [menuOpen, setMenuOpen] = useState(true)

  const toggleMenu = () => setMenuOpen(!menuOpen)
  //TODO nice transition

  const drawerWidth = 256

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
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
      <SideBar open={menuOpen} drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: menuOpen ? 0 : `-${drawerWidth}px`
        }}
      >
        <Toolbar />
        <Outlet />
        <ReactLocationDevtools position="bottom-right" />
      </Box>
    </Box>
  )
}

export default Shell
