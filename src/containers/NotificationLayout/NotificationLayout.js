import React, {Component} from 'react';
import { connect } from 'react-redux';
import FontIcon from 'material-ui/FontIcon';
import { injectIntl } from 'react-intl';
import muiThemeable from 'material-ui/styles/muiThemeable';
import ReactMaterialUiNotifications from 'react-materialui-notifications';
import { withFirebase } from 'firekit-provider';
import { withRouter } from 'react-router-dom';
import Snackbar from 'material-ui/Snackbar';

export class AppLayout extends Component {

  handleActionTouchTap = () => {
    const { messaging, history, clearMessage }= this.props;

    clearMessage()

    const click_action=messaging.message?messaging.message.notification.click_action:false;

    if(click_action){
      const indexOfCom=click_action.indexOf('.com')+4
      history.push(click_action.substring(indexOfCom))
    }

  };

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
        onTouchTap: ()=>{history.push(`/chats`)}
      }
    }
  }

  showMessage = () => {
    const { location, messaging, isDesktop, clearMessage }= this.props;

    if(!messaging.message || isDesktop){
      return false
    }

    const notification=messaging.message.notification;
    const pathname=location?location.pathname:'';
    const tag=notification.tag;
    const notifications=this.getNotifications(notification);
    const notificationData=notifications[tag]?notifications[tag]:{}

    let show=false;

    if(notificationData){
      show = pathname.indexOf(notificationData.path)===-1
    }

    if(!show){
      clearMessage()
    }

    return show
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
    const { muiTheme, isDesktop, intl, messaging, clearMessage } = this.props;

    return (
      <div style={{backgroundColor: muiTheme.palette.canvasColor, height: '100%'}}>

        {isDesktop &&
          <ReactMaterialUiNotifications
            //desktop={true} //NOT WORKING
            transitionName={{
              leave: 'dummy',
              leaveActive: 'fadeOut',
              appear: 'dummy',
              appearActive: 'zoomInUp'
            }}
            rootStyle={{bottom: 30, right: 30, zIndex:999999}}
            transitionAppear={true}
            transitionLeave={true}
          />
        }

        {this.showMessage() &&
          <Snackbar
            open={messaging.message!==undefined}
            message={messaging.message?`${messaging.message.notification.title} - ${messaging.message.notification.body}`:''}
            action={intl.formatMessage({id: 'open_label'})}
            autoHideDuration={4000}
            onActionTouchTap={this.handleActionTouchTap}
            onRequestClose={clearMessage}
          />
        }
      </div>
    );

  }
}

const mapStateToProps = (state) => {
  const { theme, locale, messaging, browser, intl } = state;

  const isDesktop=browser.greaterThan.medium

  return {
    theme, //We need this so the theme change triggers rerendering
    locale,
    messaging,
    isDesktop,
    intl
  };
};

export default connect(
  mapStateToProps,
)(muiThemeable()(injectIntl(withFirebase(withRouter(AppLayout)))));
