import Button from '@mui/material/Button'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import Paper from '@mui/material/Paper'
import React, { useState } from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import TextField from '@mui/material/TextField'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useIntl } from 'react-intl'
import { useMessaging } from 'rmw-shell/lib/providers/Firebase/Messaging'
import { getFunctions, httpsCallable } from 'firebase/functions'

const isSupported = () =>
  'Notification' in window &&
  'serviceWorker' in navigator &&
  'PushManager' in window

const Messaging = () => {
  const intl = useIntl()
  const [title, setTitle] = useState('Title')
  const [body, setBody] = useState('Your message')
  const [aktion, setAktion] = useState('/home')
  const { auth } = useAuth()
  const { token, requestPermission } = useMessaging()

  let disabled = true

  if (isSupported()) {
    disabled =
      Notification.permission !== 'granted' || title === '' || body === ''
  }

  const sendMessage = async () => {
    const httpsMessagesOnCall = httpsCallable(
      getFunctions(),
      'https-messagesOnCall'
    )

    const payload = {
      token,
      notification: {
        title,
        body,
      },
      webpush: {
        notification: {
          title,
          body,
          icon: auth.photoURL,
          image: auth.photoURL,
          click_action: '/home',
        },
      },
      data: {
        test: 'test',
      },
    }

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
              <TextField label="Token" value={token} variant="outlined" />
              <br />
              <br />
              <Button
                style={{ margin: 5 }}
                variant="contained"
                color="primary"
                onClick={() => {
                  console.log('test')
                  requestPermission()
                }}
              >
                Request Permission
              </Button>

              <br />
              <br />
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                variant="outlined"
              />
              <br />
              <br />
              <TextField
                label="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                variant="outlined"
              />
              <br />
              <br />
              <TextField
                label="Aktion"
                value={aktion}
                onChange={(e) => setAktion(e.target.value)}
                variant="outlined"
              />
              <br />
              <br />
              <Button
                style={{ margin: 5 }}
                variant="contained"
                color="primary"
                onClick={sendMessage}
                disabled={disabled}
              >
                SEND
              </Button>
              <br />
              <br />
              <Button
                style={{ margin: 5 }}
                variant="contained"
                color="primary"
                onClick={() => {
                  setTimeout(sendMessage, 5000)
                }}
                disabled={disabled}
              >
                SEND in 5 sec
              </Button>
            </div>
          </Paper>
        </div>
      </Scrollbar>
    </Page>
  )
}

export default Messaging
