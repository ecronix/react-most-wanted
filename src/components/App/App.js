import React from 'react';
import { ResponsiveDrawer, BodyContainer } from 'material-ui-responsive-drawer';
import {DrawerHeader} from '../Drawer';
import {DrawerContent} from '../../containers/Drawer';
import {Routes} from '../Routes'

const App = (props) => {

  return (
    <div>
      <ResponsiveDrawer openSecondary={false}>
        <DrawerHeader/>
        <DrawerContent/>
      </ResponsiveDrawer>
      <BodyContainer openSecondary={false}>
        <Routes/>
      </BodyContainer>
    </div>
  );
}

export default App;
