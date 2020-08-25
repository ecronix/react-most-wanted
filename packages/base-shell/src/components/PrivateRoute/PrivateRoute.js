import React, { useContext } from 'react'
import ConfigContext from '../../providers/Config/Context'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../../providers/Auth/Context'

function PrivateRoute({ component: Component, ...rest }) {
  const { appConfig } = useContext(ConfigContext)
  const { auth } = useContext(AuthContext)
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
