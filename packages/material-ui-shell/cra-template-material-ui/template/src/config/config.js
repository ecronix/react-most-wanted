import React, { lazy } from 'react'
import locales from './locales'
import routes from './routes'
import { isAuthorised } from '../utils/auth'
import { getAuth } from '../utils/auth'
import getMenuItems from './menuItems'
import parseLanguages from 'base-shell/lib/utils/locale'

const config = {
  auth: {
    isAuthenticated: isAuthorised,
    getData: () => {
      return getAuth()
    },
    signInURL: '/signin',
  },
  routes,
  locale: {
    locales,
    defaultLocale: parseLanguages(['en', 'de', 'ru'], 'en'),
  },
  menu: {
    getMenuItems,
  },
  pages: {
    LandingPage: lazy(() => import('../pages/LandingPage/LandingPage')),
    PageNotFound: lazy(() => import('../pages/PageNotFound/PageNotFound')),
  },
}

export default config
