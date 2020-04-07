import React, { lazy } from 'react'
import routes from './routes'

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
    PageNotFound: () => <div>Page not found 2</div>,
  },
  components: {
    Menu: lazy(() => import('../containers/Menu/Menu')),
    Loading: () => <div>Loading...</div>,
  },
}

export default config
