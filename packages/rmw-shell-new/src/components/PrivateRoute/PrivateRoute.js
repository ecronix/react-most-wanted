import React, { useContext } from 'react'
import ConfigContext from 'base-shell/lib/providers/Config/Context'
import { Route, Redirect } from 'react-router-dom'
import { shallowEqual, useSelector } from 'react-redux'

function PrivateRoute({ component: Component, ...rest }) {
  const { appConfig } = useContext(ConfigContext)
  const { auth: authConfig } = appConfig || {}
  const { isAuthenticated = () => false, signInURL = '/signin' } =
    authConfig || {}
  const auth = useSelector((state) => state.auth, shallowEqual)
  const isAuthed = auth.isAuthorised

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthed ? (
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
