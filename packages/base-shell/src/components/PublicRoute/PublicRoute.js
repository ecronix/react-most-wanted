import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../../providers/Auth/Context'

function PublicRoute({ component: Component, redirectTo = '/', ...rest }) {
  const { auth } = useContext(AuthContext)

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
