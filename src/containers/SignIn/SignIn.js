import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {injectIntl} from 'react-intl';
import { Activity } from '../../containers/Activity';
import muiThemeable from 'material-ui/styles/muiThemeable';
import firebaseui from 'firebaseui';
import {firebaseAuth} from '../../firebase';
import config from '../../config';
import { withRouter } from 'react-router-dom';
import { withFirebase } from 'firekit';

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
      signInOptions: config.firebase_providers.map((p)=>p.PROVIDER_ID)
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
)(injectIntl(muiThemeable()(withRouter(withFirebase(SignIn)))));
