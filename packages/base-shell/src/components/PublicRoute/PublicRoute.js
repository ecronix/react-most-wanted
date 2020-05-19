import React, { useContext } from 'react'
import ConfigContext from '../../providers/Config/Context'
import { Route, Redirect } from 'react-router-dom'

function PublicRoute({ component: Component, redirectTo = '/', ...rest }) {
  const { appConfig } = useContext(ConfigContext)
  const { auth } = appConfig || {}
  const { isAuthenticated = () => false } = auth || {}

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated(appConfig) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: redirectTo,
              search: `from=${props.location.pathname}`,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

export default PublicRoute
