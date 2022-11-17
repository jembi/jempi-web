import { FC } from 'react'

import {
  Dashboard as DashboardIcon,
  Diamond as DiamondIcon,
  Logout as LogoutIcon,
  People as PeopleIcon,
  Search as SearchIcon
} from '@mui/icons-material'
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material'

interface SideBarProps {
  open: boolean
}

const SideBar: FC<SideBarProps> = ({ open }) => {
  return (
    <Drawer
      variant="persistent"
      PaperProps={{ sx: { width: 256 } }}
      open={open}
    >
      <Toolbar />
      <Divider />
      <Toolbar>
        {/* TODO Swap out for real icon */}
        <DiamondIcon sx={{ color: '#8EF680', mr: 2 }} />
        <Typography variant="h6">JeMPI</Typography>
      </Toolbar>
      <Divider />
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <List component="nav">
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon sx={{ mr: 2 }} />
              <ListItemText>Dashboard</ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <SearchIcon sx={{ mr: 2 }} />
              <ListItemText>Search</ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <PeopleIcon sx={{ mr: 2 }} />
              <ListItemText>Review Matches</ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <Divider sx={{ my: 1 }} />
        </List>
        <List component="nav">
          <Divider sx={{ my: 1 }} />
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon sx={{ mr: 2 }} />
              <ListItemText>Logout</ListItemText>
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  )
}

export default SideBar
