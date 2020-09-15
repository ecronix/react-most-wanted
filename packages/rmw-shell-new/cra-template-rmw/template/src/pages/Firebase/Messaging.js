import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import Paper from '@material-ui/core/Paper'
import React, { useContext, useEffect, useState } from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import TextField from '@material-ui/core/TextField'
import { Typography } from '@material-ui/core'
import { useFirebase } from 'rmw-shell/lib/providers/Firebase'
import { useConfig } from 'base-shell/lib/providers/Config'
import { useIntl } from 'react-intl'

export default function () {
  const intl = useIntl()
  const [value, setValue] = useState('')
  const { firebaseApp } = useFirebase()
  const { appConfig } = useConfig()
  const { firebase } = appConfig || {}
  const { messaging: messagingConfig } = firebase || {}
  const { publicVapidKey } = messagingConfig || {}

  useEffect(() => {
    const messaging = firebaseApp.messaging()
    console.log('starting listener')
    messaging.onTokenRefresh(() => {
      console.log('token refresh')
      messaging
        .getToken()
        .then((refreshedToken) => {
          console.log('Token refreshed.', refreshedToken)

          // ...
        })
        .catch((err) => {
          console.log('Unable to retrieve refreshed token ', err)
        })
    })
  }, [])

  const enableMessaing = async () => {
    const messaging = firebaseApp.messaging()
    if (publicVapidKey) {
      messaging.usePublicVapidKey(publicVapidKey)
    }

    const permission = await Notification.requestPermission()

    console.log('permission', permission)
    //await messaging.requestPermission()

    const token = await messaging.getToken()

    setValue(token)

    messaging.onMessage((payload) => {
      console.log('Message received. ', payload)
    })

    console.log('token', token)
  }

  const sendMessage = async () => {
    const messaging = firebaseApp.messaging()
    //await enableMessaing()

    const httpsMessagesOnCall = firebaseApp
      .functions()
      .httpsCallable('httpsMessagesOnCall')

    const payload = {
      token: value,
      notification: {
        title: 'Title',
        body: 'Body',
      },
      data: {
        test: 'test',
      },
    }

    console.log('payload send ', payload)

    await httpsMessagesOnCall({
      payload,
    })
      .then((result) => {
        console.log(result)
      })
      .catch((error) => console.log('error', error))
  }

  return (
    <Page
      pageTitle={intl.formatMessage({
        id: 'firebase_paths_demo',
        defaultMessage: 'Firebase Paths Demo',
      })}
    >
      <Scrollbar
        style={{ height: '100%', width: '100%', display: 'flex', flex: 1 }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Paper
            style={{
              maxWidth: 450,
              minWidth: 300,
              minHeight: 300,
              padding: 18,
            }}
          >
            <div>
              <TextField
                label="Token"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                variant="outlined"
              />
              <br />
              <br />
              <Button
                style={{ margin: 5 }}
                variant="contained"
                color="primary"
                onClick={enableMessaing}
              >
                ENABLE MESSAGING
              </Button>
              <br />
              <br />
              <Button
                style={{ margin: 5 }}
                variant="contained"
                color="primary"
                onClick={sendMessage}
              >
                SEND
              </Button>
            </div>
          </Paper>
        </div>
      </Scrollbar>
    </Page>
  )
}
