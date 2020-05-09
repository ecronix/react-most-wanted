import React, { lazy } from 'react'
import locales from './locales'
import routes from './routes'
import { isAuthorised } from '../utils/auth'
import getMenuItems from './menuItems'
import LandingPage from '../pages/LandingPage/LandingPage'
import parseLanguages from 'base-shell/lib/utils/locale'

const Loading = () => <div>Loading...</div>

const config = {
  auth: {
    isAuthenticated: isAuthorised,
    signInURL: '/signin',
  },
  routes,
  locale: {
    locales,
    defaultLocale: parseLanguages(['en', 'de', 'ru'], 'en'),
  },
  getMenuItems,
  pages: {
    LandingPage: lazy(() => import('../pages/LandingPage/LandingPage')),
    PageNotFound: lazy(() => import('../pages/PageNotFound/PageNotFound')),
  },
}

export default config
