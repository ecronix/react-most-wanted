import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {injectIntl} from 'react-intl';
import { Activity } from '../../containers/Activity';
import muiThemeable from 'material-ui/styles/muiThemeable';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import {firebaseAuth} from '../../utils/firebase';
import { initMessaging } from '../../store/messaging/actions';
import {withRouter} from 'react-router-dom';

var authUi = new firebaseui.auth.AuthUI(firebaseAuth);

class SignIn extends Component {

  componentDidMount() {
    const {browser, initMessaging}= this.props;

    var uiConfig = {
      signInSuccessUrl: '/',
      signInFlow: browser.greaterThan.medium?'popup':'redirect',
      callbacks: {
        signInSuccess: function(user, credentials, redirect) {

          initMessaging();

          //To avoid page reload on single page applications
          return false;
        }
      },
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ]
    };

    authUi.start('#firebaseui-auth', uiConfig);

  }

  componentWillUnmount() {
    authUi.reset();
  }

  render(){

    const  {intl} = this.props;

    return (
      <Activity
        title={intl.formatMessage({id: 'sign_in'})}>
        <div style={{paddingTop: 35, width: '100%'}}>
          <div id="firebaseui-auth" style={{width: '100%'}}></div>
        </div>
      </Activity>
    );

  }

}


SignIn.propTypes = {
  intl: PropTypes.object.isRequired,
  muiTheme: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
  const {browser } = state;
  return {
    browser
  };
};


export default connect(
  mapStateToProps,
  { initMessaging}
)(injectIntl(muiThemeable()(withRouter(SignIn))));
