import React from 'react';
import { ResponsiveDrawer, BodyContainer } from 'material-ui-responsive-drawer';
import {DrawerHeader} from '../Drawer';
import {DrawerContent} from '../../containers/Drawer';
import {Routes} from '../Routes';
import {Helmet} from 'react-helmet';
import {injectIntl} from 'react-intl';
import muiThemeable from 'material-ui/styles/muiThemeable';

const App = (props) => {

  const { intl, muiTheme } = props;

  return (
    <div>
      <Helmet>
        <title>{intl.formatMessage({id: 'app_name'})}</title>
        <meta name="theme-color" content={muiTheme.palette.primary1Color}/>
        <meta name="apple-mobile-web-app-status-bar-style" content={muiTheme.palette.primary1Color}/>
        <meta name="msapplication-navbutton-color" content={muiTheme.palette.primary1Color}/>
      </Helmet>
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

export default injectIntl(muiThemeable()(App));
