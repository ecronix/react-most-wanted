import { lazy } from 'react'
import locales from './locales'
import routes from './routes'
import themes from './themes'
import { parseLanguages } from '@ecronix/base-shell'
import { Loading } from '@ecronix/material-ui-shell'

const config = {
  containers: {
    LayoutContainer: lazy(
      () => import('@ecronix/material-ui-shell/containers/LayoutContainer')
    ),
  },
  components: {
    Loading,
    Menu: lazy(() => import('@ecronix/material-ui-shell/containers/Menu')),
  },
  auth: {
    signInURL: '/signin',
  },
  pwa: {
    useiOSPWAPrompt: true,
    iOSPWAPromptProps: {},
  },
  routes,
  locale: {
    locales,
    defaultLocale: parseLanguages(['en', 'de', 'ru'], 'en'),
    onError: (e) => {
      // Here we warn the user about translation error
      //console.warn(e)
      return
    },
  },
  menu: {
    width: 240,
    offlineIndicatorHeight: 12,
    initialAuthMenuOpen: false,
    initialMiniMode: false,
    initialMenuOpen: true,
    initialMobileMenuOpen: false,
    initialMiniSwitchVisibility: true,
    MenuHeader: lazy(
      () => import('@ecronix/material-ui-shell/components/MenuHeader')
    ),
    MenuContent: lazy(() => import('../components/Menu')),
    useWindowWatcher: false,
  },
  theme: {
    themes,
    defaultThemeID: 'default',
    defaultIsDarkMode: false,
    defaultIsRTL: false, //change this to true for default Right to Left Language support
  },
  pages: {
    LandingPage: lazy(() => import('../pages/LandingPage')),
    PageNotFound: lazy(() => import('../pages/PageNotFound')),
  },
}

export default config
