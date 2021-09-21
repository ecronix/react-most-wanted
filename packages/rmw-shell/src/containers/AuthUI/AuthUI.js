import React, { useEffect, useCallback } from 'react'
import { useIntl } from 'react-intl'
import * as firebaseui from 'firebaseui'
import { getAuth } from 'firebase/auth'

let authUi = null

/*eslint-disable */
const AuthUI = ({ uiConfig }) => {
  const intl = useIntl()
  const locale = intl.locale

  const auth = getAuth()

  const initAuth = useCallback(async () => {
    try {
      if (!firebaseui.auth.AuthUI.getInstance()) {
        authUi = new firebaseui.auth.AuthUI(auth)
      } else {
        authUi = firebaseui.auth.AuthUI.getInstance()
      }
    } catch (err) {
      console.warn(err)
    }

    try {
      authUi.start('#firebaseui-auth', uiConfig)
    } catch (error) {
      console.warn(error)
    }
  }, [locale])

  useEffect(() => {
    initAuth()

    return () => {
      try {
        if (authUi) {
          authUi.reset()
        }
      } catch (err) {
        console.warn(err)
      }
    }
  }, [initAuth, authUi])

  return (
    <div style={{ paddingTop: 35 }}>
      <div key={`${intl.locale}`} id="firebaseui-auth" />
    </div>
  )
}

export default AuthUI

/*eslint-enable */
