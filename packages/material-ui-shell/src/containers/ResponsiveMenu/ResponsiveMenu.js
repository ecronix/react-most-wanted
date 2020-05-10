import React, { useContext, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import MenuContext from '../../providers/Menu/Context'
import clsx from 'clsx'
import withWidth, { isWidthDown } from '@material-ui/core/withWidth'
import PropTypes from 'prop-types'

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

  hide: {
    display: 'none',
  },
}))


const ResponsiveMenu = ({ children, width }) => {
  const classes = useStyles()
  const theme = useTheme()
  const smDown = isWidthDown('sm', width)

  const {
    isDesktopOpen,
    isMobileOpen,
    setDesktopOpen,
    isMini,
    setMobileOpen,
  } = useContext(MenuContext)

  const handleDrawerToggle = () => {
    setMobileOpen(!isMobileOpen)
  }

  const isWidthDesktop = width !== 'sm' && width !== 'xs';
 
  useEffect(() => {
   if(isWidthDesktop){
    setDesktopOpen(true);
   }
  }, [isWidthDesktop])


  return (
    <div style={{ boxSizing: 'content-box' }}>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        variant={smDown ? 'temporary' : 'permanent'}
        // className={classes.drawer}
        onClose={handleDrawerToggle}
        anchor={
          smDown ? undefined : theme.direction === 'rtl' ? 'right' : 'left'
        }
        classes={{
          paper: smDown
            ? classes.drawerPaper
            : clsx(classes.drawerPaperOpen,
              !isDesktopOpen && classes.drawerPaperClose
              , !isMini && !isDesktopOpen && classes.hide
            ),
        }}
        open={smDown ? isMobileOpen : isDesktopOpen}
        onOpen={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {children}
      </SwipeableDrawer>
    </div >
  )
}
ResponsiveMenu.propTypes = {
  children: PropTypes.any,
}

export default withWidth()(ResponsiveMenu);