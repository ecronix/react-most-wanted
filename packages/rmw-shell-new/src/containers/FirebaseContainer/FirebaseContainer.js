import React, { useContext, useEffect } from 'react'
import { useConfig } from 'base-shell/lib/providers/Config'
import { useAuth } from 'base-shell/lib/providers/Auth'
import FirebaseProvider from 'rmw-shell/lib/providers/Firebase'
import PathsProvider from 'rmw-shell/lib/providers/Firebase/Paths/Provider'
import ListsProvider from 'rmw-shell/lib/providers/Firebase/Lists/Provider'
import DocsProvider from 'rmw-shell/lib/providers/Firebase/Docs/Provider'
import ColsProvider from 'rmw-shell/lib/providers/Firebase/Cols/Provider'
import MessagingProvider from 'rmw-shell/lib/providers/Firebase/Messaging/Provider'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/messaging'
import 'firebase/functions'

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
  const { prod = {}, dev = {} } = firebaseConfig || {}

  //Firebase app should be initialized only once
  if (firebase.apps.length === 0) {
    firebaseApp = firebase.initializeApp(
      process.env.NODE_ENV !== 'production' ? dev.initConfig : prod.initConfig
    )
  } else {
    firebaseApp = firebase.apps[0]
  }

  useEffect(() => {
    const unsubscribe = firebaseApp.auth().onAuthStateChanged((user) => {
      setAuth(defaultUserData(user))
    })

    //return unsubscribe()
  }, [])

  return (
    <FirebaseProvider firebaseApp={firebaseApp}>
      <PathsProvider firebaseApp={firebaseApp}>
        <ListsProvider firebaseApp={firebaseApp}>
          <DocsProvider firebaseApp={firebaseApp}>
            <ColsProvider firebaseApp={firebaseApp}>
              <MessagingProvider firebaseApp={firebaseApp}>
                {children}
              </MessagingProvider>
            </ColsProvider>
          </DocsProvider>
        </ListsProvider>
      </PathsProvider>
    </FirebaseProvider>
  )
}
