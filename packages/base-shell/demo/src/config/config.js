import React, { lazy } from 'react'
import locales from './locales'
import routes from './routes'
import { isAuthorised } from '../utils/auth'
import getMenuItems from './menuItems'
import LandingPage from '../pages/LandingPage/LandingPage'
import parseLanguages from 'base-shell/lib/utils/locale'
import configureStore from 'base-shell/lib/utils/store'

const Loading = () => <div>Loading...</div>

const persistorConfig = {
  key: 'root',
  blacklist: [
    'auth',
    'form',
    'connection',
    'initialization',
    'messaging',
    'simpleValues',
  ],
}

const initState = {
  locale: parseLanguages(['en', 'de', 'ru'], 'en'),
}

const config = {
  redux: {
    configureStore: () => configureStore({ persistorConfig, initState }),
  },
  auth: {
    isAuthenticated: isAuthorised,
    signInURL: '/signin',
  },
  routes,
  locales,
  getMenuItems,
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
