import React, { useContext } from 'react'
import ConfigContext from '../../providers/Config/Context'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../../providers/Auth/Context'

function PrivateRoute({ component: Component, ...rest }) {
  const { appConfig } = useContext(ConfigContext)
  const { isAuthenticated } = useContext(AuthContext)
  const { auth } = appConfig || {}
  const { signInURL = '/signin' } = auth || {}

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
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
