import { AccountCircle as AccountCircleIcon } from '@mui/icons-material'
import { Box, Divider, IconButton, Typography } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import * as React from 'react'
import { useAuth } from '../../hooks/useAuth'

interface NavigationMenuProp {}

const NavigationMenu: React.FC<NavigationMenuProp> = () => {
  const { user } = useAuth()

  console.log(user)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size="large"
        edge="end"
      >
        <AccountCircleIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem onClick={handleClose}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              fontWeight={400}
              fontSize={'16px'}
              lineHeight="150%"
              letterSpacing={'0.15px'}
            >
              {`${user?.firstName} ${user?.lastName}`}
            </Typography>
            <Typography
              fontWeight={400}
              fontSize={'14px'}
              lineHeight="143%"
              letterSpacing={'0.17px'}
            >
              {user?.email}
            </Typography>
          </Box>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose}>
          <Typography
            fontWeight={500}
            fontSize={'13px'}
            lineHeight="22px"
            letterSpacing={'0.17px'}
          >
            LOG OUT
          </Typography>
        </MenuItem>
      </Menu>
    </>
  )
}

export default NavigationMenu
