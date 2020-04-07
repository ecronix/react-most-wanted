import React from 'react'
import withConfig from '../../providers/ConfigProvider/withConfig'
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute({ component: Component, appConfig, ...rest }) {
  const { auth } = appConfig || {}
  const { isAuthenticated = () => false, signInURL = '/signin' } =
    appConfig || {}

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated(appConfig) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: signInURL,
              search: `from=${props.location.pathname}`,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

export default withConfig(PrivateRoute)
