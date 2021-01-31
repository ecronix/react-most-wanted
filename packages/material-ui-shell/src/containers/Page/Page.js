import React, { useContext } from 'react'
import MenuContext from 'material-ui-shell/lib/providers/Menu/Context'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useConfig } from 'base-shell/lib/providers/Config'
import { useOnline } from 'base-shell/lib/providers/Online'
import { useIntl } from 'react-intl'
import clsx from 'clsx'
import {
  AppBar,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography
} from '@material-ui/core'
import {
  ChevronLeft,
  Menu as MenuIcon
} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
  },
  appBar: {
    zIndex: theme.zIndex.drawer,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    maxHeight: 64,
  },
  appBarShift: {
    width: (props) => `calc(100% - ${props.width}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: -12,
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
    height: (props) => props.offlineIndicatorHeight,
  },
  content: {
    flex: 1,
    overflow: 'auto',
  },
  grow: {
    flex: '1 1 auto',
  },
}))

export default function ({
  children,
  pageTitle,
  onBackClick,
  isLoading,
  appBarContent = null,
  contentStyle,
  tabs = null,
}) {
  const isOnline = useOnline()
  const theme = useTheme()
  const { appConfig } = useConfig()
  const { menu } = appConfig || {}
  const { width = 240, offlineIndicatorHeight = 12 } = menu || {}

  const {
    toggleThis,
    isDesktop,
    isMenuOpen,
  } = useContext(MenuContext)
  const intl = useIntl()
  let headerTitle = ''

  if (typeof pageTitle === 'string' || pageTitle instanceof String) {
    headerTitle = pageTitle
  }

  const classes = useStyles({ width, offlineIndicatorHeight })
  const handleDrawerMenuClick = () => {
    if (!isMenuOpen) {
      toggleThis('isMiniMode', false)
      toggleThis('isMenuOpen', true)
      if (!isDesktop) {
        toggleThis('isMobileMenuOpen')}
    } else {
      toggleThis('isMobileMenuOpen')}
  }

  return (
    <div className={classes.root}>
      <AppBar
        position={isDesktop ? 'absolute' : ndefined}
        className={
          isDesktop
            ? clsx(classes.appBar, isMenuOpen && classes.appBarShift)
            : classes.appBar
        }
      >
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerMenuClick}
            edge="start"
            className={clsx(
              classes.menuButton,
              isMenuOpen && isDesktop && classes.hide,
              onBackClick && classes.hide
            )}
          >
            <MenuIcon />
          </IconButton>
          {/* james- check if this is dead code? */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onBackClick}
            className={clsx(classes.menuButton, !onBackClick && classes.hide)}
          >
            <ChevronLeft />
          </IconButton>
          {!onBackClick && isMenuOpen && false && (
            <div style={{ marginRight: 32 }} />
          )}
          {/* james- check if this is dead code? */}
          <Typography variant="h6" color="inherit" noWrap>
            {headerTitle}
          </Typography>
          <div className={classes.grow} />
          {appBarContent}
        </Toolbar>
      </AppBar>
      <div className={classes.toolbar} />

      {isLoading && <LinearProgress />}
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
      {tabs}
      <div className={classes.content} style={contentStyle}>
        {children}
      </div>
    </div>
  )
}
