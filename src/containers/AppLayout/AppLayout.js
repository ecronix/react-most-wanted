import React, {Component} from 'react';
import { connect } from 'react-redux';
import FontIcon from 'material-ui/FontIcon';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { ResponsiveDrawer } from 'material-ui-responsive-drawer';
import { DrawerHeader } from '../../containers/Drawer';
import { DrawerContent } from '../../containers/Drawer';
import ReactMaterialUiNotifications from 'react-materialui-notifications';
import { Routes } from '../../components/Routes';
import config from '../../config';
import { withFirebase } from 'firekit';
import { withRouter } from 'react-router-dom';
import Scrollbar from '../../components/Scrollbar/Scrollbar';

export class AppLayout extends Component {

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

  render(){
    const { muiTheme, history } = this.props;
    const drawerWidth=config.drawer_width;
    const path=history.location.pathname;

    return (
      <div style={{backgroundColor: muiTheme.palette.canvasColor, height: '100%'}}>
        <ResponsiveDrawer width={drawerWidth}>
          <Scrollbar>
            <DrawerHeader/>
            <DrawerContent path={path} history={history}/>
          </Scrollbar>
        </ResponsiveDrawer>

        <Routes />

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
  const { theme, locale, messaging } = state;

  return {
    theme, //We need this so the theme change triggers rerendering
    locale,
    messaging
  };
};

export default connect(
  mapStateToProps,
)(muiThemeable()(withFirebase(withRouter(AppLayout))));
