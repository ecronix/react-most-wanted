import * as firebaseui from 'firebaseui'
import AuthUI from 'rmw-shell/lib/containers/AuthUI/AuthUI'
import ConfigContext from 'base-shell/lib/providers/Config/Context'
import FirebaseContext from 'rmw-shell/lib/providers/Firebase/Context'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { injectIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { withFirebase } from 'firekit-provider'

const SignIn = () => {
  let history = useHistory()
  const intl = useIntl()
  const { appConfig } = useContext(ConfigContext)
  const { firebaseApp } = useContext(FirebaseContext)
  const { firebase = {} } = appConfig || {}
  const { firebaseuiProps = {} } = firebase

  const uiConfig = {
    signInSuccessUrl: '/',
    signInFlow: 'popup',
    callbacks: {
      signInSuccessWithAuthResult: () => {
        console.log('test')
        history.push('/home')

        // To avoid page reload on single page applications
        return false
      },
    },
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    ...firebaseuiProps,
  }

  return (
    <Page pageTitle={intl.formatMessage({ id: 'sign_in' })}>
      <Helmet>
        <link
          type="text/css"
          rel="stylesheet"
          href="https://www.gstatic.com/firebasejs/ui/4.6.1/firebase-ui-auth.css"
        />
      </Helmet>
      <AuthUI firebaseApp={firebaseApp} uiConfig={uiConfig} />
    </Page>
  )
}

export default SignIn
