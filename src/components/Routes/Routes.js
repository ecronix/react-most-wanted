import React from 'react';
import { Dashboard } from '../../containers/Dashboard';
import { About } from '../../containers/About';
import { MyAccount } from '../../containers/MyAccount';
import { Tasks, Task } from '../../containers/Tasks';
import { Companies, Companie } from '../../containers/Companies';
import { Users } from '../../containers/Users';
import { PageNotFound } from '../../components/PageNotFound';
import { SignIn } from '../../containers/SignIn';
import { RestrictedRoute } from '../../containers/RestrictedRoute';
import createHistory from 'history/createBrowserHistory'


import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

const history = createHistory();

const Routes = (props, context) => {

  return (

    <Router history={history} >
      <Switch >
        <RestrictedRoute type='private' path="/" exact component={Dashboard} />
        <RestrictedRoute type='private' path="/dashboard" exact component={Dashboard} />

        <RestrictedRoute type='private' path="/tasks" exact component={Tasks} />
        <RestrictedRoute type='private' path="/tasks/edit/:uid" exact component={Task} />
        <RestrictedRoute type='private' path="/tasks/create" exact component={Task} />

        <RestrictedRoute type='private' path="/companies" exact component={Companies} />
        <RestrictedRoute type='private' path="/companies/edit/:uid" exact component={Companie} />
        <RestrictedRoute type='private' path="/companies/create" exact component={Companie} />

        <RestrictedRoute type='private' path="/users" exact component={Users} />
        <RestrictedRoute type='private' path="/about" exact component={About}  />
        <RestrictedRoute type='private' path="/my_account"  exact component={MyAccount} />
        <RestrictedRoute type='public' path="/signin" component={SignIn} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>


  );
}

export default Routes;
