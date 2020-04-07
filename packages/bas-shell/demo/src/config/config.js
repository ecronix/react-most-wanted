import React, { lazy } from 'react'
import routes from './routes'

const Loading = () => <div>Loading...</div>

const config = {
  auth: {
    isAuthenticated: () => {
      return false
    },
    signInURL: '/signin',
  },
  routes,
  pages: {
    LandingPage: lazy(() => import('../pages/LandingPage/LandingPage')),
    PageNotFound: lazy(() => import('../pages/PageNotFound/PageNotFound')),
  },
  components: {
    Menu: lazy(() => import('../containers/Menu/Menu')),
    Loading,
  },
}

export default config
