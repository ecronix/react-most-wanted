import React, { useContext } from 'react'
import ConfigContext from '../../providers/Config/Context'
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute({ component: Component, ...rest }) {
  const { appConfig } = useContext(ConfigContext)
  const { auth } = appConfig || {}
  const { isAuthenticated = () => false, signInURL = '/signin' } = auth || {}

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

export default PrivateRoute
