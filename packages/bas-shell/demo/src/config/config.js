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
    LandingPage: () => <div>Landing Page</div>,
    PageNotFound: () => <div>Page not found 2</div>,
  },
  components: {
    Menu: lazy(() => import('../containers/Menu/Menu')),
    Loading: () => <div>Loading...</div>,
  },
}

export default config
