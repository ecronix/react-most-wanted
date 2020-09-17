import PropTypes from 'prop-types'
import React, { useState, useEffect, useReducer, Fragment } from 'react'
import Context from './Context'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import Paper from '@material-ui/core/Paper'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import TextField from '@material-ui/core/TextField'
import { Typography } from '@material-ui/core'
import { useConfig } from 'base-shell/lib/providers/Config'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useIntl } from 'react-intl'
import { useSnackbar } from 'notistack'
import { useTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import SnackMessage from 'rmw-shell/lib/components/SnackMessage/SnackMessage'

const Provider = ({ children, firebaseApp }) => {
  const [token, setToken] = useState(false)
  const intl = useIntl()
  const { appConfig } = useConfig()
  const { auth } = useAuth()
  const { firebase } = appConfig || {}
  const { messaging: messagingConfig } = firebase || {}
  const { publicVapidKey } = messagingConfig || {}
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [messaging, setMessaging] = useState(null)

  useEffect(() => {
    if (Notification.permission === 'granted') {
      initializeMessaging()
    }
  }, [])

  const syncToken = (token) => {
    setToken(token)
    try {
      firebaseApp
        .database()
        .ref(`notification_tokens/${auth.uid}/${token}`)
        .set(true)
    } catch (error) {
      console.warn(error)
    }
  }

  const initializeMessaging = async () => {
    const messaging = firebaseApp.messaging()
    if (publicVapidKey) {
      messaging.usePublicVapidKey(publicVapidKey)
    }

    messaging.onMessage((payload) => {
      enqueueSnackbar('', {
        content: (key) => {
          return <SnackMessage payload={payload} id={key} />
        },
      })
    })

    messaging.onTokenRefresh(() => {
      messaging
        .getToken()
        .then((t) => syncToken(t))
        .catch((e) => {
          console.log('Unable to retrieve refreshed token ', e)
        })
    })

    try {
      const token = await messaging.getToken()
      await syncToken(token)
    } catch (error) {
      console.log('Unable to retrieve token ', error)
    }
  }

  const action = (key) => (
    <Fragment>
      <Button
        onClick={async () => {
          closeSnackbar(key)
          const permission = await Notification.requestPermission()
          if (permission === 'granted') {
            initializeMessaging()
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
        firebaseApp,
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
  firebaseApp: PropTypes.any,
}

export default Provider
