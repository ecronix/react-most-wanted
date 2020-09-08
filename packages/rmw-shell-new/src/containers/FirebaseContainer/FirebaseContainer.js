import React, { useContext, useEffect } from 'react'
import { useConfig } from 'base-shell/lib/providers/Config'
import { useAuth } from 'base-shell/lib/providers/Auth'
import FirebaseProvider from 'rmw-shell/lib/providers/Firebase/Provider'
import FirebasePathsProvider from 'rmw-shell/lib/providers/FirebasePaths/Provider'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/messaging'

let firebaseApp = null

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
  const { appConfig } = useConfig()
  const { auth, setAuth } = useAuth()
  const { firebase: firebaseConfig } = appConfig || {}
  const { config_dev, config_prod } = firebaseConfig || {}

  //Firebase app should be initialized only once
  if (firebase.apps.length === 0) {
    firebaseApp = firebase.initializeApp(
      process.env.NODE_ENV !== 'production' ? config_dev : config_prod
    )
  } else {
    firebaseApp = firebase.apps[0]
  }

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      setAuth(defaultUserData(user))
    })
  }, [])

  return (
    <FirebaseProvider firebaseApp={firebaseApp}>
      <FirebasePathsProvider firebaseApp={firebaseApp}>
        {children}
      </FirebasePathsProvider>
    </FirebaseProvider>
  )
}
