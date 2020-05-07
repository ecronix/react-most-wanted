import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import drawerActions from '../../store/drawer/actions'
import withOnline from 'base-shell/lib/providers/OnlineProvider/withOnline'

const drawerWidth = 240
const offlineIndicatorHeight = 12

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  offlineIndicator: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.main,
    justifyContent: 'center',
    right: 0,
    left: 0,
    height: offlineIndicatorHeight,
  },
  content: {
    flexGrow: 1,
    //padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}))

const Page = ({ children, setDrawerOpen, drawer, isOnline, intl, pageTitle }) => {
  let headerTitle = ''

  if (typeof pageTitle === 'string' || pageTitle instanceof String) {
    headerTitle = pageTitle
  }

  const classes = useStyles()
  const theme = useTheme()
  const { open = false } = drawer

  const handleDrawerOpen = () => {
    setDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  return (
    <div>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {headerTitle}
          </Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.drawerHeader} />

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {!isOnline && (
          <React.Fragment>
            <div className={classes.offlineIndicator}>
              <Typography variant="caption" noWrap>
                {intl.formatMessage({
                  id: 'offline',
                  defaultMessage: 'Offline',
                })}
              </Typography>
            </div>
            <div style={{ height: offlineIndicatorHeight }}></div>
          </React.Fragment>
        )}
        {children}
      </main>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { drawer } = state
  return { drawer }
}

export default compose(
  connect(mapStateToProps, { ...drawerActions }),
  withOnline,
  injectIntl
)(Page)
