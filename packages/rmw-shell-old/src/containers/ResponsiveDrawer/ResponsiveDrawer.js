import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import drawerActions from '../../store/drawer/actions'
import withWidth, { isWidthDown } from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'redux'
import { connect } from 'react-redux'

const drawerWidth = 240

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

const styles = theme => ({
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
})

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
    open: false,
  }

  handleDrawerToggle = () => {
    const { setDrawerMobileOpen, drawer } = this.props
    setDrawerMobileOpen(!drawer.mobileOpen)
  }

  handleDrawerOpen = () => {
    const { setDrawerOpen } = this.props
    setDrawerOpen(true)
  }

  handleDrawerClose = () => {
    const { setDrawerOpen } = this.props
    setDrawerOpen(false)
  }

  render() {
    const { classes, theme, children, drawer, width } = this.props

    const smDown = isWidthDown('sm', width)

    return (
      <div style={{ boxSizing: 'content-box' }}>
        <SwipeableDrawer
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          variant={smDown ? 'temporary' : 'permanent'}
          onClose={this.handleDrawerToggle}
          anchor={
            smDown ? undefined : theme.direction === 'rtl' ? 'right' : 'left'
          }
          classes={{
            paper: smDown
              ? classes.drawerPaper
              : classNames(
                classes.drawerPaperOpen,
                !drawer.open && classes.drawerPaperClose,
                !drawer.useMinified && classes.hide
              ),
          }}
          open={smDown ? drawer.mobileOpen : drawer.open}
          onOpen={this.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {children}
        </SwipeableDrawer>
      </div>
    )
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  const { drawer } = state

  return {
    drawer,
  }
}

export default compose(
  connect(mapStateToProps, { ...drawerActions }),
  withWidth(),
  withStyles(styles, { withTheme: true })
)(ResponsiveDrawer)
