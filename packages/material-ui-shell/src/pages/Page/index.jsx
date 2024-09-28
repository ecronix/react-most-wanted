import React, { useContext } from 'react'
import { useTheme as useAppTheme } from '@ecronix/material-ui-shell'
import MenuContext from '@ecronix/material-ui-shell/providers/Menu/Context'
import { useTheme } from '@mui/material/styles'
import { useConfig, useOnline } from '@ecronix/base-shell'

import { useIntl } from 'react-intl'
import {
  AppBar,
  Toolbar,
  IconButton,
  LinearProgress,
  Typography,
} from '@mui/material'
import { ChevronLeft, Menu as MenuIcon } from '@mui/icons-material'

export default function ({
  children,
  pageTitle,
  onBackClick,
  isLoading,
  appBarContent = null,
  contentStyle,
  tabs = null,
}) {
  const { isRTL } = useAppTheme()
  const isOnline = useOnline()
  const theme = useTheme()
  const { appConfig } = useConfig()
  const { menu } = appConfig || {}
  const { width = 240, appBarLeadingContent = null } = menu || {}

  const { toggleThis, isDesktop, isMenuOpen } = useContext(MenuContext)
  const intl = useIntl()
  let headerTitle = ''

  if (typeof pageTitle === 'string' || pageTitle instanceof String) {
    headerTitle = pageTitle
  }

  const handleDrawerMenuClick = () => {
    if (!isMenuOpen) {
      toggleThis('isMiniMode', false)
      toggleThis('isMenuOpen', true)
      if (!isDesktop) {
        toggleThis('isMobileMenuOpen')
      }
    } else {
      toggleThis('isMobileMenuOpen')
    }
  }

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <AppBar
        position={isDesktop ? 'absolute' : undefined}
        sx={{
          width:
            isMenuOpen && isDesktop ? `calc(100% - ${width}px)` : undefined,
          zIndex: theme.zIndex['drawer'],
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          maxHeight: 64,
          marginLeft: isRTL ? 0 : -12,
          marginRight: isRTL ? 30 : 0,
        }}
      >
        <Toolbar>
          {(isMenuOpen && isDesktop) ||
            (!onBackClick && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerMenuClick}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            ))}
          {/* james- check if this is dead code? */}
          {onBackClick && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={onBackClick}
            >
              <ChevronLeft />
            </IconButton>
          )}
          {!onBackClick && isMenuOpen && false && (
            <div style={{ marginRight: 32 }} />
          )}
          {appBarLeadingContent}
          {/* james- check if this is dead code? */}
          <Typography variant="h6" color="inherit" noWrap>
            {headerTitle}
          </Typography>
          <div style={{ flex: '1 1 auto' }} />
          {appBarContent}
        </Toolbar>
      </AppBar>
      <div
        style={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          //...theme.mixins.toolbar,
          minHeight: 64, //height of AppBar
        }}
      />

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
      <div style={{ flex: 1, overflow: 'auto', ...contentStyle }}>
        {children}
      </div>
    </div>
  )
}
