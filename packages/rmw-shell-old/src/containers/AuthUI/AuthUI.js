import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
let authUi = null

export class AuthUI extends Component {
  async componentDidMount() {
    const { firebaseApp, uiConfig, intl } = this.props

    let firebaseui = null

    try {
      const { default: defaultImport } = await import(`./npm__${intl.locale}`)
      firebaseui = defaultImport
    } catch (error) {
      firebaseui = await import('firebaseui')
    }

    try {
      if (!firebaseui.auth.AuthUI.getInstance()) {
        authUi = new firebaseui.auth.AuthUI(firebaseApp.auth())
      } else {
        // console.log(firebaseui.auth)
      }
    } catch (err) {
      console.warn(err)
    }

    authUi.start('#firebaseui-auth', uiConfig)
  }

  componentWillUnmount() {
    try {
      authUi.reset()
    } catch (err) {
      console.warn(err)
    }
  }

  render() {
    return (
      <div style={{ paddingTop: 35 }}>
        <div id="firebaseui-auth" />
      </div>
    )
  }
}

export default injectIntl(AuthUI)
