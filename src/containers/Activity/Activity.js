import React, {Component} from 'react';
import { connect } from 'react-redux';
import { ResponsiveAppBar } from 'material-ui-responsive-drawer';
import { Helmet } from 'react-helmet';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { ResponsiveDrawer, BodyContainer } from 'material-ui-responsive-drawer';
import { DrawerHeader } from '../../containers/Drawer';
import { DrawerContent } from '../../containers/Drawer';
import LinearProgress from 'material-ui/LinearProgress';
import ReactMaterialUiNotifications from 'react-materialui-notifications';
import {injectIntl} from 'react-intl';
import {
  deepOrange500,
  darkWhite,
} from 'material-ui/styles/colors';
import config from '../../config';
import { withFirebase } from 'firekit';
import { withRouter } from 'react-router-dom';
import Scrollbar from '../../components/Scrollbar/Scrollbar';

export class Activity extends Component {

  componentDidMount(){
    const { messaging, initMessaging }= this.props;

    if(messaging===undefined || !messaging.isInitialized){
      initMessaging(token=>{this.handleTokenChange(token)}, this.handleMessageReceived)
    }
  }

  handleTokenChange = (token) => {
    const { firebaseApp }= this.props;

    firebaseApp.database().ref(`users/${firebaseApp.auth().currentUser.uid}/notificationTokens/${token}`).set(true);
  }

  getNotifications = (notification) => {
    const { history }= this.props;
    return {
      chat: {
        path: 'chats',
        autoHide: 3000,
        title: notification.title,
        icon: <div><FontIcon className="material-icons" style={{fontSize: 12}}>chat</FontIcon></div>,
        additionalText: notification.body,
        onClick: ()=>{history.push(`/chats`)}
      },
    }
  }



  handleMessageReceived = (payload) => {
    const { muiTheme, location }= this.props;

    const notification=payload.notification;
    const pathname=location?location.pathname:'';
    const tag=notification.tag;
    const notifications=this.getNotifications(notification);
    const notificationData=notifications[tag]?notifications[tag]:false;

    if(notificationData){
      if(pathname.indexOf(notificationData.path)===-1){
        ReactMaterialUiNotifications.showNotification({
          avatar: notification.icon,
          iconBadgeColor: muiTheme.palette.accent1Color,
          timestamp: notification.timestamp,
          personalised: true,
          ...notificationData
        })
      }
    }

  }


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
        <ResponsiveDrawer
          //containerStyle={{overflow: undefined, height: '100%'}}
          width={drawerWidth}>
          <Scrollbar>
            <DrawerHeader/>
            <DrawerContent/>
          </Scrollbar>
        </ResponsiveDrawer>

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

        <ReactMaterialUiNotifications
          desktop={true}
          transitionName={{
            leave: 'dummy',
            leaveActive: 'fadeOut',
            appear: 'dummy',
            appearActive: 'zoomInUp'
          }}
          rootStyle={{top: 30, right: 30, zIndex:999999}}
          maxNotifications={5}
          transitionAppear={true}
          transitionLeave={true}
        />
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
