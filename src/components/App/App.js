import React from 'react';
import { ResponsiveDrawer, BodyContainer } from 'material-ui-responsive-drawer';
import DrawerHeader from '../Drawer/DrawerHeader.js';
import DrawerContent from '../../containers/Drawer/DrawerContent.js';
import Routes from '../../routes'

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
