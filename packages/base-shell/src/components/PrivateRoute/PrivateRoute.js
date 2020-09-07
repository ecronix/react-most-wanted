import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../../providers/Auth'
import { useConfig } from '../../providers/Config'

function PrivateRoute({ component: Component, ...rest }) {
  const { appConfig } = useContext()
  const { auth } = useAuth()
  const { auth: authConfig } = appConfig || {}
  const { signInURL = '/signin' } = authConfig || {}

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated ? (
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

export default PrivateRoute
