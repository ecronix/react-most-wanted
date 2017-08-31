import React, {Component} from 'react';
import { connect } from 'react-redux';
import { ResponsiveAppBar } from 'material-ui-responsive-drawer';
import { Helmet } from 'react-helmet';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { BodyContainer } from 'material-ui-responsive-drawer';
import LinearProgress from 'material-ui/LinearProgress';
import {injectIntl} from 'react-intl';
import { deepOrange500, darkWhite } from 'material-ui/styles/colors';
import config from '../../config';
import { withFirebase } from 'firekit';
import { withRouter } from 'react-router-dom';

export class Activity extends Component {

  getIconElementLeft = () => {

    const {onBackClick} = this.props;

    if(onBackClick){
      return <IconButton>
        <FontIcon className="material-icons" >chevron_left</FontIcon>
      </IconButton>
    }else {
      return undefined;
    }
  }

  render(){

    const {
      muiTheme,
      title,
      children,
      onBackClick,
      history,
      intl,
      isConnected,
      isLoading,
      dispatch,
      containerStyle,
      firebaseApp,
      watchConnection,
      unwatchConnection,
      watchList,
      unwatchList,
      unwatchAllLists,
      watchPath,
      unwatchPath,
      unwatchAllPaths,
      initMessaging,
      watchAuth,
      pageTitle,
      height,
      clearInitialization,
      authStateChanged,
      authError,
      destroyList,
      destroyPath,
      clearApp,
      match,
      location,
      staticContext,
      ...rest
    } = this.props;

    const drawerWidth=config.drawer_width;

    const bodyContainerStyle={
      backgroundColor: muiTheme.palette.canvasColor,
      top:64,
      bottom: 0,
      overflow: 'auto',
      ...containerStyle
    };

    let headerTitle=''

    if(typeof title === 'string' || title instanceof String){
      headerTitle=title;
    }else{
      headerTitle=pageTitle;
    }

    return (
      <div style={{backgroundColor: muiTheme.palette.canvasColor, height: '100%'}}>
        <Helmet>
          <meta name="theme-color" content={muiTheme.palette.primary1Color}/>
          <meta name="apple-mobile-web-app-status-bar-style" content={muiTheme.palette.primary1Color}/>
          <meta name="msapplication-navbutton-color" content={muiTheme.palette.primary1Color}/>
          <title>{headerTitle}</title>
        </Helmet>
        <ResponsiveAppBar width={drawerWidth}
          title={title}
          showMenuIconButton={onBackClick!==undefined?true:undefined}
          onLeftIconButtonTouchTap={onBackClick}
          iconElementLeft={this.getIconElementLeft()}
          {...rest}
        />
        {!isConnected &&
          <div
            id="offline-inicator"
            style={{
              zIndex:9999,
              position: 'fixed',
              top: 0,
              height: 12,
              backgroundColor: deepOrange500,
              color: darkWhite,
              width: '100%',
              fontSize: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'

            }} >
            <span>
              {intl.formatMessage({id:'no_connection'})}
            </span>
          </div>
        }

        {isLoading &&
          <LinearProgress mode="indeterminate" color={muiTheme.palette.accent1Color} style={{zIndex:9998, position: 'fixed', top: 0, height: height?height:5}}/>
        }

        <BodyContainer width={drawerWidth} id="bodyContainer" ref="bodyContainer" withRef style={bodyContainerStyle} >
          {children}
        </BodyContainer>
      </div>
    );

  }
}

const mapStateToProps = (state) => {
  const { connection, intl } = state;

  return {
    isConnected: connection?connection.isConnected:false,
    intl
  };
};

export default connect(
  mapStateToProps,
)(injectIntl(muiThemeable()(withFirebase(withRouter(Activity)))));
