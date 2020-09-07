import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../../providers/Auth'

function PublicRoute({ component: Component, redirectTo = '/', ...rest }) {
  const { auth } = useAuth()

  return (
    <Route
      {...rest}
      render={(props) =>
        !auth.isAuthenticated ? (
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
