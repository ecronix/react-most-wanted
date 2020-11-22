import React, { useEffect } from 'react'
import { useConfig } from 'base-shell/lib/providers/Config'
import { useAuth } from 'base-shell/lib/providers/Auth'
import FirebaseProvider from 'rmw-shell/lib/providers/Firebase'
import PathsProvider from 'rmw-shell/lib/providers/Firebase/Paths/Provider'
import ListsProvider from 'rmw-shell/lib/providers/Firebase/Lists/Provider'
import DocsProvider from 'rmw-shell/lib/providers/Firebase/Docs/Provider'
import ColsProvider from 'rmw-shell/lib/providers/Firebase/Cols/Provider'
import MessagingProvider from 'rmw-shell/lib/providers/Firebase/Messaging/Provider'
import StorageProvider from 'rmw-shell/lib/providers/Firebase/Storage/Provider'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import firebase from 'firebase/app'
import moment from 'moment'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/messaging'
import 'firebase/functions'
import 'firebase/storage'

let firebaseApp = null

export default function ({ children }) {
  const { appConfig } = useConfig()
  const auth = useAuth()
  const { firebase: firebaseConfig, auth: authConfig = {} } = appConfig || {}
  const { prod = {}, dev = {} } = firebaseConfig || {}
  const { onAuthStateChanged } = authConfig || {}

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
      if (onAuthStateChanged) {
        onAuthStateChanged(user, auth, firebaseApp)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <FirebaseProvider firebaseApp={firebaseApp}>
      <PathsProvider firebaseApp={firebaseApp}>
        <ListsProvider firebaseApp={firebaseApp}>
          <DocsProvider firebaseApp={firebaseApp}>
            <ColsProvider firebaseApp={firebaseApp}>
              <StorageProvider firebaseApp={firebaseApp}>
                <MessagingProvider firebaseApp={firebaseApp}>
                  <MuiPickersUtilsProvider
                    libInstance={moment}
                    utils={MomentUtils}
                  >
                    {children}
                  </MuiPickersUtilsProvider>
                </MessagingProvider>
              </StorageProvider>
            </ColsProvider>
          </DocsProvider>
        </ListsProvider>
      </PathsProvider>
    </FirebaseProvider>
  )
}
