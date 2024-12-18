import React from 'react'
import { useTheme as useAppTheme, useMenu } from '@ecronix/material-ui-shell'
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
import { togglerTypes } from '@ecronix/material-ui-shell/providers/Menu/Context'

type PageProps = {
  children: React.ReactNode
  pageTitle?: string | String
  onBackClick?: () => void
  isLoading?: boolean
  appBarContent?: any
  contentStyle?: any
  tabs?: any
}

/**
 * `Page` component that provides a layout structure with an app bar, optional back button,
 * loading indicator, offline status, and customizable content area.
 *
 * @component
 * @example
 * return (
 *   <Page
 *     pageTitle="My Custom Page"
 *     onBackClick={() => console.log('Back button clicked')}
 *     isLoading={false}
 *     appBarContent={<Button color="inherit">App Bar Button</Button>}
 *     tabs={<div>My Custom Tabs</div>}
 *   >
 *     <div>This is the content of the page.</div>
 *   </Page>
 * )
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The content to render within the page.
 * @param {string | String} [props.pageTitle] - The title to display in the app bar.
 * @param [props.onBackClick] - A callback function to handle the back button click event.
 * @param {boolean} [props.isLoading] - A flag to indicate whether the page is in a loading state.
 * @param {React.ReactNode} [props.appBarContent=null] - Content to be placed within the app bar (e.g., buttons, icons).
 * @param {React.CSSProperties} [props.contentStyle] - Additional styles to apply to the content area of the page.
 * @param {React.ReactNode} [props.tabs=null] - Tabs content to be rendered below the app bar (optional).
 *
 * @returns The rendered `Page` component.
 */
export function Page({
  children,
  pageTitle,
  onBackClick,
  isLoading,
  appBarContent = null,
  contentStyle,
  tabs = null,
}: PageProps) {
  const { isRTL } = useAppTheme()
  const isOnline = useOnline()
  const theme = useTheme()
  const { appConfig } = useConfig()
  const { menu } = appConfig || {}
  const { width = 240, appBarLeadingContent = null } = menu || {}

  // const { toggleThis, isDesktop, isMenuOpen } = useContext(MenuContext)
  const { toggleThis, isDesktop, isMenuOpen } = useMenu()
  const intl = useIntl()
  let headerTitle = ''

  if (typeof pageTitle === 'string' || pageTitle instanceof String) {
    headerTitle = pageTitle as string
  }

  const handleDrawerMenuClick = () => {
    if (!isMenuOpen) {
      toggleThis(togglerTypes.isMiniMode, false)
      toggleThis(togglerTypes.isMenuOpen, true)
      if (!isDesktop) {
        toggleThis(togglerTypes.isMobileMenuOpen)
      }
    } else {
      toggleThis(togglerTypes.isMobileMenuOpen)
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
          {isMenuOpen && isDesktop
            ? null
            : !onBackClick && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerMenuClick}
                  edge="start"
                >
                  <MenuIcon />
                </IconButton>
              )}
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
