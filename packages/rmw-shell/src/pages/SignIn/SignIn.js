import * as firebaseui from 'firebaseui'
import AuthUI from 'rmw-shell/lib/containers/AuthUI/AuthUI'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useConfig } from 'base-shell/lib/providers/Config'
import { useIntl } from 'react-intl'
import { useMenu } from 'material-ui-shell/lib/providers/Menu'

const SignIn = () => {
  const intl = useIntl()
  const { appConfig } = useConfig()
  const { firebase = {} } = appConfig || {}
  const { firebaseuiProps = {} } = firebase
  const { toggleThis } = useMenu()

  const uiConfig = {
    signInSuccessUrl: '/',
    signInFlow: 'popup',
    callbacks: {
      signInSuccessWithAuthResult: () => {
        toggleThis('isAuthMenuOpen', false)
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
      <AuthUI uiConfig={uiConfig} />
    </Page>
  )
}

export default SignIn
