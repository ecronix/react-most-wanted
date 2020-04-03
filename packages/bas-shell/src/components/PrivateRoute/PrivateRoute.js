import React from 'react'
import withConfig from '../../providers/ConfigProvider/withConfig'
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute({ children, appConfig, ...rest }) {
  console.log('appConfig', appConfig)
  const { auth } = appConfig || {}
  const { isAuthenticated = () => false, signInURL = '/signin' } =
    appConfig || {}

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated(appConfig) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: signInURL,
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default withConfig(PrivateRoute)
