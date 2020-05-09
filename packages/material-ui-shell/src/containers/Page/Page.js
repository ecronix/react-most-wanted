import React, { useContext } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { useIntl } from 'react-intl'
import OnlineContext from 'base-shell/lib/providers/Online/Context'
import MenuContext from '../../providers/Menu/Context'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const drawerWidth = 240
const offlineIndicatorHeight = 12

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
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

const Page = ({ children, pageTitle }) => {
  const isOnline = useContext(OnlineContext)
  const isDesktop = useMediaQuery('(min-width:600px)')

  const { isDesktopOpen, setDesktopOpen, setMobileOpen } = useContext(
    MenuContext
  )
  const intl = useIntl()
  let headerTitle = ''

  if (typeof pageTitle === 'string' || pageTitle instanceof String) {
    headerTitle = pageTitle
  }

  const classes = useStyles()

  const handleDrawerOpen = () => {
    if (isDesktop) {
      setDesktopOpen(true)
    } else {
      setMobileOpen(true)
    }
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isDesktop && isDesktopOpen,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(
              classes.menuButton,
              isDesktop && isDesktopOpen && classes.hide
            )}
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
          [classes.contentShift]: isDesktopOpen,
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

export default Page
