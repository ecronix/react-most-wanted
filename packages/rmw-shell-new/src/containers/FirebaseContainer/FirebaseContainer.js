import React, { useContext, useEffect } from 'react'
import ConfigContext from 'base-shell/lib/providers/Config/Context'
import AuthContext from 'base-shell/lib/providers/Auth/Context'
import FirebaseProvider from 'rmw-shell/lib/providers/Firebase/Provider'
import { withFirebase } from 'firekit-provider'
import FirebaseContext from 'rmw-shell/lib/providers/Firebase/Context'

const defaultUserData = (user) => {
  if (user != null) {
    return {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      uid: user.uid,
      providerData: user.providerData,
      isAuthenticated: true,
    }
  } else {
    return {
      isAuthenticated: false,
    }
  }
}

export default function ({ children }) {
  const { appConfig } = useContext(ConfigContext)
  const { auth, setAuth } = useContext(AuthContext)
  const { firebaseApp } = useContext(FirebaseContext)

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      setAuth(defaultUserData(user))
    })
  }, [])

  return (
    <FirebaseProvider firebaseApp={firebaseApp}>{children}</FirebaseProvider>
  )
}
