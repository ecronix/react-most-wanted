import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as authSelectors from '../../store/auth/selectors'
import { Route , Redirect } from 'react-router';


const RestrictedRoute = ({ type, isAuthorised, component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    (isAuthorised && type==='private') || (!isAuthorised && type==='public') ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: type==='private' ? `/signin`: '/',
        search: `${props.location.pathname}`,
        state: { from: props.location }
      }}/>
    )
  )}/>
)

RestrictedRoute.propTypes = {
  isAuthorised: PropTypes.bool.isRequired,

};

const mapStateToProps = (state) => {
  const { auth } = state;

  return {
    isAuthorised: authSelectors.isAuthorised(auth)
  };
};


export default connect(
  mapStateToProps
)(RestrictedRoute);
