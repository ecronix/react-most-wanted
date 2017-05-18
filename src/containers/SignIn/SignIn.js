import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {injectIntl} from 'react-intl';
import { Activity } from '../../components/Activity';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { signInWithProvider, signInUser, authError } from '../../store/auth/actions';
import { getValidationErrorMessage } from '../../store/auth/selectors';
import { push } from 'react-router-redux';
import { setDrawerOpen } from 'material-ui-responsive-drawer';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import {firebaseAuth} from '../../utils/firebase';

var authUi = new firebaseui.auth.AuthUI(firebaseAuth);

class SignIn extends Component {

  componentDidMount() {
    const {router, browser}= this.props;

    const redirect =((router || {}).location || {}).search;

    var uiConfig = {
      signInSuccessUrl: redirect.slice(1),
      signInFlow: browser.greaterThan.medium?'popup':'redirect',
      callbacks: {
        signInSuccess: function(user, credentials, redirect) {

          push(redirect || '/');

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
  signInWithProvider: PropTypes.func.isRequired,
  setDrawerOpen: PropTypes.func.isRequired,
  authError: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  muiTheme: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
  const { auth, router, browser } = state;
  return {
    auth,
    router,
    browser,
    getValidationErrorMessage: (fieldID)=>getValidationErrorMessage(auth, fieldID)
  };
};


export default connect(
  mapStateToProps,
  { signInWithProvider, signInUser, push, setDrawerOpen, authError }
)(injectIntl(muiThemeable()(SignIn)));
