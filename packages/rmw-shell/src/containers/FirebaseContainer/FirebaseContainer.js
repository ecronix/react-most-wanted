import React, { useEffect } from 'react'
import { useConfig } from 'base-shell/lib/providers/Config'
import { useAuth } from 'base-shell/lib/providers/Auth'
import PathsProvider from '../../providers/Firebase/Paths/Provider'
import ListsProvider from '../../providers/Firebase/Lists/Provider'
import DocsProvider from '../../providers/Firebase/Docs/Provider'
import ColsProvider from '../../providers/Firebase/Cols/Provider'
import MessagingProvider from '../../providers/Firebase/Messaging/Provider'
import StorageProvider from '../../providers/Firebase/Storage/Provider'
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateAdapter from '@mui/lab/AdapterMoment'

export default function ({ children }) {
  const { appConfig } = useConfig()
  const auth = useAuth()
  const { firebase: firebaseConfig, auth: authConfig = {} } = appConfig || {}
  const { prod = {}, dev = {} } = firebaseConfig || {}
  const { onAuthStateChanged: internalOnAuthStateChanged } = authConfig || {}

  if (getApps().length === 0) {
    initializeApp(
      process.env.NODE_ENV !== 'production' ? dev.initConfig : prod.initConfig
    )
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(getApp()), (user) => {
      if (onAuthStateChanged) {
        internalOnAuthStateChanged(user, auth)
      }
    })

    return () => {
      unsubscribe()
    }

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
