import PropTypes from 'prop-types'
import React, { useState, useEffect, Fragment, useCallback } from 'react'
import Context from './Context'
import { Button } from '@mui/material'
import { useConfig } from 'base-shell/lib/providers/Config'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useIntl } from 'react-intl'
import { useSnackbar } from 'notistack'
import SnackMessage from 'rmw-shell/lib/components/SnackMessage/SnackMessage'
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
  const { firebase } = appConfig || {}
  const { messaging: messagingConfig } = firebase || {}
  const { publicVapidKey } = messagingConfig || {}
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const syncToken = useCallback(
    () => async (token) => {
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

  const initializeMessaging = useCallback(
    () => async () => {
      const messaging = getMessaging(getApp())

      getToken(messaging, { vapidKey: publicVapidKey }).then((t) => {
        syncToken(t)
      })

      onMessage(messaging, (payload) => {
        enqueueSnackbar('', {
          content: (key) => {
            return <SnackMessage payload={payload} id={key} />
          },
        })
      })
    },
    [enqueueSnackbar, publicVapidKey, syncToken]
  )

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
    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notification')
      return
    }

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

Provider.propTypes = {
  children: PropTypes.any,
}

export default Provider
