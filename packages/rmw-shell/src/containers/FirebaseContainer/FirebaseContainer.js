import React, { useEffect } from 'react'
import { useConfig } from 'base-shell/lib/providers/Config'
import { useAuth } from 'base-shell/lib/providers/Auth'
import PathsProvider from 'rmw-shell/lib/providers/Firebase/Paths/Provider'
import ListsProvider from 'rmw-shell/lib/providers/Firebase/Lists/Provider'
import DocsProvider from 'rmw-shell/lib/providers/Firebase/Docs/Provider'
import ColsProvider from 'rmw-shell/lib/providers/Firebase/Cols/Provider'
import MessagingProvider from 'rmw-shell/lib/providers/Firebase/Messaging/Provider'
import StorageProvider from 'rmw-shell/lib/providers/Firebase/Storage/Provider'
import { initializeApp, getApps } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateAdapter from '@mui/lab/AdapterMoment'

export default function ({ children }) {
  const { appConfig } = useConfig()
  const auth = useAuth()
  const { firebase: firebaseConfig, auth: authConfig = {} } = appConfig || {}
  const { prod = {}, dev = {} } = firebaseConfig || {}
  const { onAuthStateChanged: internalOnAuthStateChanged } = authConfig || {}

  //Firebase app should be initialized only once
  if (getApps().length === 0) {
    initializeApp(
      process.env.NODE_ENV !== 'production' ? dev.initConfig : prod.initConfig
    )
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (onAuthStateChanged) {
        internalOnAuthStateChanged(user, auth)
      }
    })

    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PathsProvider>
      <ListsProvider>
        <DocsProvider>
          <ColsProvider>
            <StorageProvider>
              <MessagingProvider>
                <LocalizationProvider dateAdapter={DateAdapter}>
                  {children}
                </LocalizationProvider>
              </MessagingProvider>
            </StorageProvider>
          </ColsProvider>
        </DocsProvider>
      </ListsProvider>
    </PathsProvider>
  )
}
