import React, { lazy } from 'react'
import locales from './locales'
import routes from './routes'
import getMenuItems from './menuItems'
import LandingPage from '../pages/LandingPage/LandingPage'
import parseLanguages from 'base-shell/lib/utils/locale'

const Loading = () => <div>Loading...</div>

const config = {
  locale: {
    defaultLocale: parseLanguages(['en', 'de', 'ru'], 'en'),
    locales,
    persistKey: 'base-shell:locale',
    onError: (e) => {
      //Uncomment this to show react-intl missing translation warnings
      //console.warn(e)
      return
    },
  },
  auth: {
    persistKey: 'base-shell:auth',
    signInURL: '/signin',
  },
  routes,
  menu: {
    getMenuItems,
  },
  pages: {
    LandingPage: LandingPage,
    PageNotFound: lazy(() => import('../pages/PageNotFound/PageNotFound')),
  },
  components: {
    Menu: lazy(() => import('../containers/Menu/Menu')),
    Loading,
  },
  containers: {
    AppContainer: ({ children }) => (
      <div>App Container {children} App Container</div>
    ),

    LayoutContainer: ({ children }) => (
      <div>Layout Container {children} Layout Container</div>
    ),
  },
}

export default config
