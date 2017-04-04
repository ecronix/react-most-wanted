import React from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import About from '../../components/About/About';
import PageNotFound from '../../components/PageNotFound/PageNotFound';
import { Route , Switch} from 'react-router';

const Routes = (props) => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/about" exact component={About} />
      <Route path="/*" component={PageNotFound} />
    </Switch>
  );
}

export default Routes;
