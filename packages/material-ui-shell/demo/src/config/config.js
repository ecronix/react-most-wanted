import React, { lazy } from 'react'
import locales from './locales'
import routes from './routes'
import { isAuthorised } from '../utils/auth'
import getMenuItems from './menuItems'
import LandingPage from '../pages/LandingPage/LandingPage'
import parseLanguages from 'base-shell/lib/utils/localeTools'

const Loading = () => <div>Loading...</div>

const config = {
  initial_state: {
    locale: parseLanguages(['en', 'de', 'ru'], 'en'),
  },
  auth: {
    isAuthenticated: isAuthorised,
    signInURL: '/signin',
  },
  routes,
  locales,
  getMenuItems,

  components: {
    Menu: lazy(() => import('../containers/Menu/Menu')),
  },
}

export default config
