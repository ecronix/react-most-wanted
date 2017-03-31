import React from 'react';
import DrawerControls from '../components/DrawerControls/DrawerControls.js';
import PageNotFound from '../components/PageNotFound/PageNotFound.js';
import { Route , Switch} from 'react-router';

const Routes = (props) => {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={PageNotFound} />
        <Route path="/drawer_controls" exact component={DrawerControls} />
        <Route path="/test1" component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default Routes;
