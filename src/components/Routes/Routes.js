import React from 'react';
import {Dashboard} from '../../components/Dashboard';
import {About} from '../../components/About';
import {PageNotFound} from '../../components/PageNotFound';
import {SignIn} from '../../containers/SignIn';
import { Route , Switch} from 'react-router';

const Routes = (props) => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/about" exact component={About} />
      <Route path="/signin" component={SignIn} />
      <Route path="/*" component={PageNotFound} />
    </Switch>
  );
}

export default Routes;
