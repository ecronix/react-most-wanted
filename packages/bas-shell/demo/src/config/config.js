import React from 'react'
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
}

export default config
