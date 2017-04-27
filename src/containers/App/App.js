import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ResponsiveDrawer, BodyContainer } from 'material-ui-responsive-drawer';
import { DrawerHeader } from '../../containers/Drawer';
import { DrawerContent } from '../../containers/Drawer';
import { Routes } from '../../components/Routes';
import { Helmet } from 'react-helmet';
import { injectIntl } from 'react-intl';
import muiThemeable from 'material-ui/styles/muiThemeable';
import * as authSelectors from '../../store/auth/selectors'

const App = ({ intl, muiTheme, auth, isAuthorised }) => {

  return (
    <div>
      <Helmet>
        <title>{intl.formatMessage({id: 'app_name'})}</title>
        <meta name="theme-color" content={muiTheme.palette.primary1Color}/>
        <meta name="apple-mobile-web-app-status-bar-style" content={muiTheme.palette.primary1Color}/>
        <meta name="msapplication-navbutton-color" content={muiTheme.palette.primary1Color}/>
      </Helmet>
      <ResponsiveDrawer>
        <DrawerHeader/>
        <DrawerContent/>
      </ResponsiveDrawer>
      <BodyContainer style={{backgroundColor: muiTheme.palette.canvasColor}}>
        <Routes isAuthorised={isAuthorised}/>
      </BodyContainer>
    </div>
  );


}

App.propTypes = {
  auth: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  muiTheme: PropTypes.object.isRequired,
  isAuthorised: PropTypes.bool.isRequired,

};

const mapStateToProps = (state) => {
  const { auth } = state;

  return {
    auth,
    isAuthorised: authSelectors.isAuthorised(auth)
  };
};


export const AppTest=injectIntl(muiThemeable()(App));

export default connect(
  mapStateToProps
)(injectIntl(muiThemeable()(App)));
