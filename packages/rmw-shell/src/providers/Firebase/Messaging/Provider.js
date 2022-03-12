import React, { useState, useEffect, Fragment, useCallback } from 'react'
import Context from './Context'
import { Button } from '@mui/material'
import { useConfig } from 'base-shell/lib/providers/Config'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useIntl } from 'react-intl'
import { useSnackbar } from 'notistack'
import SnackMessage from '../../../components/SnackMessage/SnackMessage'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { getDatabase, ref, set } from 'firebase/database'
import { getApp } from 'firebase/app'

const isSupported = () =>
  'Notification' in window &&
  'serviceWorker' in navigator &&
  'PushManager' in window

const Provider = ({ children }) => {
  const [token, setToken] = useState(false)
  const intl = useIntl()
  const { appConfig } = useConfig()
  const { auth = {} } = useAuth()
  const { uid, notificationsDisabled = false } = auth || {}
  const { firebase: firebaseConfig } = appConfig || {}
  const { prod = {}, dev = {} } = firebaseConfig || {}

  const firebase = process.env.NODE_ENV !== 'production' ? dev : prod

  const { messaging: messagingConfig } = firebase || {}
  const { publicVapidKey } = messagingConfig || {}
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const syncToken = useCallback(
    async (token) => {
      if (notificationsDisabled) {
        return
      }

      setToken(token)
      try {
        if (uid) {
          await set(
            ref(getDatabase(), `notification_tokens/${uid}/${token}`),
            true
          )
        }
      } catch (error) {
        console.warn(error)
      }
    },
    [uid, notificationsDisabled]
  )

  const initializeMessaging = useCallback(async () => {
    const messaging = getMessaging()

    onMessage(messaging, (payload) => {
      enqueueSnackbar('', {
        content: (key) => {
          return <SnackMessage payload={payload} id={key} />
        },
      })
    })

    const token = await getToken(messaging, { vapidKey: publicVapidKey })

    syncToken(token)
  }, [enqueueSnackbar, publicVapidKey, syncToken])

  useEffect(() => {
    if (
      isSupported() &&
      Notification.permission === 'granted' &&
      !notificationsDisabled
    ) {
      initializeMessaging()
    }
  }, [initializeMessaging, notificationsDisabled])

  const action = (key) => (
    <Fragment>
      <Button
        onClick={async () => {
          if (isSupported()) {
            closeSnackbar(key)
            const permission = await Notification.requestPermission()
            if (permission === 'granted') {
              initializeMessaging()
            }
          }
        }}
        style={{ margin: 8 }}
        //color="inherit"
        variant="contained"
        size="small"
      >
        {intl.formatMessage({ id: 'enable', defaultMessage: 'Enable' })}
      </Button>
      <Button
        onClick={() => {
          closeSnackbar(key)
        }}
        size="small"
        color="secondary"
      >
        {intl.formatMessage({ id: 'no_thanks', defaultMessage: 'No, thanks' })}
      </Button>
    </Fragment>
  )

  const requestPermission = () => {
    console.log('test 2', 'Notification' in window)
    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notification')
      return
    }

    console.log('test 3', Notification.permission)

    if (Notification.permission === 'default') {
      enqueueSnackbar(
        intl.formatMessage({
          id: 'enable_notifications',
          defaultMessage: 'Enable Notifications?',
        }),
        {
          variant: 'default',
          persist: true,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          action,
        }
      )
    } else if (Notification.permission === 'granted') {
      console.log('Notifications are enabled')
      initializeMessaging()
    }
  }

  return (
    <Context.Provider
      value={{
        requestPermission,
        token,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Provider
