import React from 'react';
import { Route } from 'react-router';
import App from '../containers/App/App.js';
import DrawerControls from '../components/DrawerControls/DrawerControls.js';
import PageNotFound from '../components/PageNotFound/PageNotFound.js';

export default(
  <Route  >

    //Application parts wraped into the App container with Responsive Drawer
    <Route  component={App}>
      <Route path="/drawer_controls" component={DrawerControls}/>
      <Route path="/" component={DrawerControls}/>
      <Route path="*" component={DrawerControls}/>
      <Route path="/test1" component={PageNotFound}/>
      <Route path="/test2" component={PageNotFound}/>
    </Route>

    //Application parts without the App container


  </Route>
);
