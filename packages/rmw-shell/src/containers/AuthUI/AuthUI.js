import React, { useEffect } from 'react'

export function AuthUI(props) {
  let authUi = null

  const initAuth = async () => {
    const { firebaseApp, uiConfig, intl } = props

    let firebaseui = null

    try {
      // eslint-disable-next-line
      const { default: defaultImport } = await import(`./npm__${intl.locale}`)
      firebaseui = defaultImport
    } catch (error) {
      // eslint-disable-next-line
      firebaseui = await import('firebaseui')
    }

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
      //console.warn(error)
    }
  }

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
  }, [])

  return (
    <div style={{ paddingTop: 35 }}>
      <div id="firebaseui-auth" />
    </div>
  )
}

export default AuthUI
