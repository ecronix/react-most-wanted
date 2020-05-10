import React, { useContext } from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { useIntl } from 'react-intl'
import OnlineContext from 'base-shell/lib/providers/Online/Context'
import MenuContext from '../../providers/Menu/Context'
import withWidth, { isWidthDown } from '@material-ui/core/withWidth'
import LinearProgress from '@material-ui/core/LinearProgress'
import ChevronLeft from '@material-ui/icons/ChevronLeft'

const drawerWidth = 240
const offlineIndicatorHeight = 12

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    maxHeight: 64,
  },
  appBarShift: {
    //marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: -12,
    //marginRight: 12
  },
  hide: {
    display: 'none',
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    ...theme.mixins.toolbar,
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
    flex: 1,
    backgroundColor: theme.palette.background.default,
  },
  grow: {
    flex: '1 1 auto',
  },
}))

const Page = ({ children, pageTitle, width, onBackClick, isLoading }) => {
  const isOnline = useContext(OnlineContext)
  const theme = useTheme()

  const {
    isDesktop,
    isDesktopOpen,
    setDesktopOpen,
    isMobileOpen,
    setMobileOpen,
    isMini,
    setMini,
  } = useContext(MenuContext)
  const intl = useIntl()
  let headerTitle = ''

  if (typeof pageTitle === 'string' || pageTitle instanceof String) {
    headerTitle = pageTitle
  }

  const classes = useStyles()
  const handleDrawerMenuClick = () => {
    if (!isDesktopOpen) {
      setMini(false)
      setDesktopOpen(true)
      if (!isDesktop) {
        setMobileOpen(!isMobileOpen)
      }
    } else {
      setMobileOpen(!isMobileOpen)
    }
  }

  return (
    <div className={classes.root}>
      <AppBar
        position={width !== 'sm' && width !== 'xs' ? 'absolute' : undefined}
        className={
          width !== 'sm' && width !== 'xs'
            ? clsx(classes.appBar, isDesktopOpen && classes.appBarShift)
            : classes.appBar
        }
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerMenuClick}
            edge="start"
            className={clsx(
              classes.menuButton,
              isDesktopOpen && isDesktop && classes.hide,
              onBackClick && classes.hide
            )}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onBackClick}
            className={clsx(classes.menuButton, !onBackClick && classes.hide)}
          >
            <ChevronLeft />
          </IconButton>
          {!onBackClick && isDesktopOpen && false && (
            <div style={{ marginRight: 32 }} />
          )}

          <Typography variant="h6" color="inherit" noWrap>
            {headerTitle}
          </Typography>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>

      <div className={classes.toolbar} />
      {isLoading && <LinearProgress />}
      {/* {!isOnline && (
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
        )} */}
      {!isOnline && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: 15,
            backgroundColor: theme.palette.secondary.main,
          }}
        >
          <Typography variant="caption" color="textSecondary" noWrap>
            {intl.formatMessage({
              id: 'offline',
              defaultMessage: 'Offline',
            })}
          </Typography>
        </div>
      )}
      <main className={classes.content}>{children}</main>
    </div>
  )
}

export default withWidth()(Page)
