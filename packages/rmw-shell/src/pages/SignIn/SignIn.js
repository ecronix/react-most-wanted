import * as firebaseui from 'firebaseui'
import Activity from '../../containers/Activity'
import AuthUI from '../../containers/AuthUI/AuthUI'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import { withAppConfigs } from '../../contexts/AppConfigProvider'
import { withFirebase } from 'firekit-provider'

export class SignIn extends Component {
  render() {
    const { intl, firebaseApp, appConfig } = this.props

    const { firebase_auth_props = {} } = appConfig || {}

    const uiConfig = {
      signInSuccessUrl: '/',
      signInFlow: 'popup',
      callbacks: {
        signInSuccessWithAuthResult: () => {
          // initMessaging()

          // To avoid page reload on single page applications
          return false
        },
      },
      signInOptions: appConfig.firebase_providers,
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      ...firebase_auth_props,
    }

    return (
      <Activity title={intl.formatMessage({ id: 'sign_in' })}>
        <AuthUI firebaseApp={firebaseApp} uiConfig={uiConfig} />
      </Activity>
    )
  }
}

SignIn.propTypes = {
  intl: PropTypes.object.isRequired,
}

export default injectIntl(withFirebase(withAppConfigs(SignIn)))
