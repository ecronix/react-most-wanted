import React from 'react';
import {Dashboard} from '../../components/Dashboard';
import {About} from '../../components/About';
import {MyAccount} from '../../containers/MyAccount';
import {PageNotFound} from '../../components/PageNotFound';
import {SignIn} from '../../containers/SignIn';
import { Route , Switch, Redirect} from 'react-router';

const Routes = ({auth}) => {

  const isAuthorised=auth&&auth.isSignedIn;

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      isAuthorised ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/signin',
          state: { from: props.location }
        }}/>
      )
    )}/>
  )


  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/dashboard" exact component={Dashboard} />
      <PrivateRoute path="/about" exact component={About}  />
      <PrivateRoute path="/my_account" exact component={MyAccount}  />
      <Route path="/signin" component={SignIn} />
      <Route path="/*" component={PageNotFound} />
    </Switch>
  );
}

export default Routes;
