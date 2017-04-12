import React from 'react';
import {Dashboard} from '../../components/Dashboard';
import {About} from '../../components/About';
import {PageNotFound} from '../../components/PageNotFound';
import {SignIn} from '../../containers/SignIn';
import { Route , Switch, Redirect} from 'react-router';

const Routes = (props) => {

  const {auth}=props;

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      auth!=null ? (
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
      <PrivateRoute path="/about" exact component={About} />
      <Route path="/signin" component={SignIn} />
      <Route path="/*" component={PageNotFound} />
    </Switch>
  );
}

export default Routes;
