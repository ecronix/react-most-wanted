import React, { useEffect, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { useFirebase } from 'rmw-shell/lib/providers/Firebase'
import * as firebaseui from 'firebaseui'

let authUi = null

/*eslint-disable */
const AuthUI = ({ uiConfig }) => {
  const intl = useIntl()
  const { firebaseApp } = useFirebase()
  const locale = intl.locale

  const initAuth = useCallback(async () => {
    /*
    let firebaseui = null

    try {
      // eslint-disable-next-line
      let localeUI

      if (locale === 'de') {
        localeUI = await import(`./npm__de`)
      } else if (locale === 'ru') {
        localeUI = await import(`./npm__ru`)
      } else if (locale === 'es') {
        localeUI = await import(`./npm__es`)
      } else if (locale === 'en') {
        localeUI = await import(`./npm__en`)
      }

      const { default: defaultImport } = localeUI
      firebaseui = defaultImport
    } catch (error) {
      console.log('error', error)
      // eslint-disable-next-line
      firebaseui = await import('firebaseui')
    }
    */

    try {
      if (!firebaseui.auth.AuthUI.getInstance()) {
        authUi = new firebaseui.auth.AuthUI(firebaseApp.auth())
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
  }, [locale, firebaseApp])

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
  }, [initAuth, firebaseApp, authUi])

  return (
    <div style={{ paddingTop: 35 }}>
      <div key={`${intl.locale}`} id="firebaseui-auth" />
    </div>
  )
}

export default AuthUI

/*eslint-enable */
