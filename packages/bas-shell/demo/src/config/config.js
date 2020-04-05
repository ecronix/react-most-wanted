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
  landingPage: () => <div>Landing Page</div>,
  Menu: lazy(() => import('../containers/Menu/Menu')),
}

export default config
