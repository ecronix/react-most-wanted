import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router'

export const RestrictedRoute = ({
  type,
  isAuthorised,
  component: Component,
  fallbackComponent: FallbackComponent = false,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if ((isAuthorised && type === 'private') || (!isAuthorised && type === 'public')) {
        return <Component {...props} />
      } else if (FallbackComponent) {
        return <FallbackComponent {...props} />
      } else {
        return (
          <Redirect
            to={{
              pathname:
                type === 'private' ? '/signin' : props.location.state ? props.location.state.from.pathname : '/',
              search: `from=${props.location.pathname}`,
              state: { from: props.location }
            }}
          />
        )
      }
    }}
  />
)

RestrictedRoute.propTypes = {
  isAuthorised: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  const { auth } = state

  return {
    isAuthorised: auth.isAuthorised
  }
}

export default connect(mapStateToProps)(RestrictedRoute)
