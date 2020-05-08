import React, { lazy } from 'react'
import locales from './locales'
import routes from './routes'
import { isAuthorised } from '../utils/auth'
import getMenuItems from './menuItems'
import LandingPage from '../pages/LandingPage/LandingPage'
import parseLanguages from 'base-shell/lib/utils/locale'
import reducers from 'material-ui-shell/lib/store/reducers'

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
    configureStoreProps: { persistorConfig, reducers, initState },
  },
  auth: {
    isAuthenticated: isAuthorised,
    signInURL: '/signin',
  },
  routes,
  locales,
  getMenuItems,
  pages: {
    LandingPage: lazy(() => import('../pages/LandingPage/LandingPage')),
    PageNotFound: lazy(() => import('../pages/PageNotFound/PageNotFound')),
  },
}

export default config
