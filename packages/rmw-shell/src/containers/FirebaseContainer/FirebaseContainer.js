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
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/messaging'
import 'firebase/compat/functions'
import 'firebase/compat/storage'
import 'firebase/compat/database'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

let firebaseApp = null

export default function ({ children }) {
  const { appConfig } = useConfig()
  const auth = useAuth()
  const { firebase: firebaseConfig, auth: authConfig = {} } = appConfig || {}
  const { prod = {}, dev = {} } = firebaseConfig || {}
  const { onAuthStateChanged: internalOnAuthStateChanged } = authConfig || {}

  //Firebase app should be initialized only once
  if (firebase.apps.length === 0) {
    firebaseApp = firebase.initializeApp(
      process.env.NODE_ENV !== 'production' ? dev.initConfig : prod.initConfig
    )
  } else {
    firebaseApp = firebase.apps[0]
  }

  useEffect(() => {
    const a = getAuth(firebaseApp)
    const unsubscribe = onAuthStateChanged(a, (user) => {
      if (onAuthStateChanged) {
        internalOnAuthStateChanged(user, auth)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <FirebaseProvider firebaseApp={firebaseApp}>
      <PathsProvider>
        <ListsProvider>
          <DocsProvider>
            <ColsProvider>
              <StorageProvider firebaseApp={firebaseApp}>
                <MessagingProvider>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
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
