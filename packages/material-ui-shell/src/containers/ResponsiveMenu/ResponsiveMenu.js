import PropTypes from 'prop-types'
import React from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { useMenu } from 'material-ui-shell/lib/providers/Menu'
import { useTheme as useAppTheme } from 'material-ui-shell/lib/providers/Theme'

const drawerWidth = 240
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    height: '100vh',
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperOpen: {
    height: '100vh',
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    height: '100vh',
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(1) * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(1) * 9,
    },
  },
  drawerPaperClose2: {
    height: '100vh',
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: 0,
    [theme.breakpoints.up('sm')]: {
      width: 0,
    },
  },
  hide: {
    display: 'none',
  },
}))

const ResponsiveMenu = ({ children, width }) => {
  const classes = useStyles()
  const { isRTL } = useAppTheme()
  const menuContext = useMenu()
  const { toggleThis, isDesktop, isMiniMode, isMenuOpen, isMobileMenuOpen } =
    menuContext || {}

  const handleDrawerToggle = () => {
    toggleThis('isMobileMenuOpen')
  }
  return (
    <div style={{ boxSizing: 'content-box' }}>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        variant={isDesktop ? 'permanent' : 'temporary'}
        onClose={handleDrawerToggle}
        anchor={!isDesktop ? undefined : isRTL ? 'right' : 'left'}
        classes={{
          paper: isDesktop
            ? clsx(
                classes.drawerPaperOpen,
                !isMenuOpen && classes.drawerPaperClose,
                !isMiniMode && !isMenuOpen && classes.drawerPaperClose2
              )
            : classes.drawerPaper,
        }}
        open={isDesktop ? !!isMenuOpen : !!isMobileMenuOpen}
        onOpen={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {children}
      </SwipeableDrawer>
    </div>
  )
}
ResponsiveMenu.propTypes = {
  children: PropTypes.any,
}

export default ResponsiveMenu
