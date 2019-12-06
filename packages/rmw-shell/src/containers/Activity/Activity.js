import AppBar from '@material-ui/core/AppBar'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'
import drawerActions from '../../store/drawer/actions'
import withWidth, { isWidthDown } from '@material-ui/core/withWidth'
import { Helmet } from 'react-helmet'
import { compose, bindActionCreators } from 'redux'
import { injectIntl } from 'react-intl'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    maxHeight: 64
  },
  menuButton: {
    marginLeft: -12
    //marginRight: 12
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    ...theme.mixins.toolbar
  },
  content: {
    flex: 1,
    backgroundColor: theme.palette.background.default
  },

  appBarShift: {
    //marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  hide: {
    display: 'none'
  },
  grow: {
    flex: '1 1 auto'
  }
})

const Activity = ({
  width,
  classes,
  theme,
  children,
  intl,
  title,
  pageTitle,
  appBarContent,
  isLoading,
  onBackClick
}) => {
  const drawer = useSelector(state => state.drawer, shallowEqual)
  const isOffline = useSelector(({ connection }) => (connection ? !connection.isConnected : false), shallowEqual)
  const { setDrawerMobileOpen, setDrawerOpen } = bindActionCreators({ ...drawerActions }, useDispatch())

  const handleDrawerMenuClick = () => {
    const smDown = isWidthDown('sm', width)

    if (!drawer.open) {
      setDrawerOpen(true)
      if (smDown) {
        setDrawerMobileOpen(!drawer.mobileOpen)
      }
    } else {
      setDrawerMobileOpen(!drawer.mobileOpen)
    }
  }

  let headerTitle = ''

  if (typeof title === 'string' || title instanceof String) {
    headerTitle = title
  }

  if (pageTitle) {
    headerTitle = pageTitle
  }

  //const smDown = width === 'sm' || width === 'xs'
  const smDown = isWidthDown('sm', width)

  return (
    <div className={classes.root}>
      <Helmet>
        <meta name="theme-color" content={theme.palette.primary.main} />
        <meta name="apple-mobile-web-app-status-bar-style" content={theme.palette.primary.main} />
        <meta name="msapplication-navbutton-color" content={theme.palette.primary.main} />
        <title>{headerTitle}</title>
      </Helmet>

      <AppBar
        position={width !== 'sm' && width !== 'xs' ? 'absolute' : undefined}
        className={
          width !== 'sm' && width !== 'xs'
            ? classNames(classes.appBar, drawer.open && classes.appBarShift)
            : classes.appBar
        }
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerMenuClick}
            className={classNames(
              classes.menuButton,
              drawer.open && !smDown && classes.hide,
              onBackClick && classes.hide
            )}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onBackClick}
            className={classNames(classes.menuButton, !onBackClick && classes.hide)}
          >
            <ChevronLeft />
          </IconButton>
          {!onBackClick && drawer.open && false && <div style={{ marginRight: 32 }} />}

          <Typography variant="h6" color="inherit" noWrap>
            {headerTitle}
          </Typography>
          <div className={classes.grow} />
          {appBarContent}
        </Toolbar>
      </AppBar>
      <div className={classes.toolbar} />
      {isLoading && <LinearProgress />}
      {isOffline && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: 15,
            backgroundColor: theme.palette.secondary.main
          }}
        >
          <Typography variant="caption" color="textSecondary" noWrap>
            {intl.formatMessage({ id: 'offline' })}
          </Typography>
        </div>
      )}
      <main className={classes.content}>{children}</main>
    </div>
  )
}

export default compose(
  withWidth(),
  withStyles(styles, { withTheme: true }),
  injectIntl
)(Activity)
