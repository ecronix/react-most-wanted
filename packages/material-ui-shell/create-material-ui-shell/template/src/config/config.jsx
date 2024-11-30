import locales from './locales'
import routes from './routes'
import themes from './themes'
import { parseLanguages } from '@ecronix/base-shell'
import {
  Loading,
  LayoutContainer,
  MenuContainer,
  MenuHeader,
} from '@ecronix/material-ui-shell'
import { LandingPage } from '../pages/LandingPage'
import { PageNotFound } from '../pages/PageNotFound'
import { Menu } from '../components/Menu'

const config = {
  containers: {
    LayoutContainer,
  },
  components: {
    Loading,
    Menu: MenuContainer,
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
    MenuHeader,
    MenuContent: Menu,
    useWindowWatcher: true,
  },
  theme: {
    themes,
    defaultThemeID: 'default',
    defaultIsDarkMode: false,
    defaultIsRTL: false, //change this to true for default Right to Left Language support
  },
  pages: {
    LandingPage,
    PageNotFound,
  },
}

export default config
