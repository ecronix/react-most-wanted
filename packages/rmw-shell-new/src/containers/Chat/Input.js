import React, { useState } from 'react'
import Input from '@material-ui/core/Input'
import { useTheme } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import Mic from '@material-ui/icons/Mic'
import MyLocation from '@material-ui/icons/MyLocation'
import CameraAlt from '@material-ui/icons/CameraAlt'
import Send from '@material-ui/icons/Send'
import { useIntl } from 'react-intl'
import IconButton from '@material-ui/core/IconButton'
import * as firebase from 'firebase'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useLists } from 'rmw-shell/lib/providers/Firebase/Lists'

export default function ({ path }) {
  const theme = useTheme()
  const intl = useIntl()
  const { auth } = useAuth()
  const [value, setValue] = useState('')
  const { firebaseApp } = useLists()

  const sendMessage = async (type = 'text') => {
    let newMessage = {
      created: firebase.database.ServerValue.TIMESTAMP,
      authorName: auth.displayName,
      authorUid: auth.uid,
      authorPhotoUrl: auth.photoURL,
      languageCode: intl.formatMessage({
        id: 'current_locale',
        defaultMessage: 'en-US',
      }),
      type,
      message: value,
    }

    await firebaseApp.database().ref(`${path}`).push(newMessage)
    setValue('')
  }

  return (
    <div
      style={{
        display: 'flex',
        padding: 4,
        paddingBottom: 8,
        alignItems: 'center',
      }}
    >
      <div
        style={{
          margin: 0,
          marginLeft: 8,
          marginRight: 8,
          paddingRight: 8,
          backgroundColor: theme.palette.grey[300],
          borderRadius: 22,
          height: '100%',
          flex: 1,
          display: 'flex',
        }}
      >
        <Input
          style={{
            height: 50,
            left: 15,
          }}
          multiline
          rowsMax="2"
          disableUnderline={true}
          fullWidth={true}
          autoFocus
          value={value}
          autoComplete="off"
          placeholder={intl.formatMessage({
            id: 'write_message_hint',
            defaultMessage: 'Write message',
          })}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              e.preventDefault()
              sendMessage()
            }
          }}
          type="Text"
        />
        <IconButton color="primary" size="small" edge={false}>
          <CameraAlt />
        </IconButton>
        <IconButton color="primary" size="small">
          <MyLocation />
        </IconButton>
      </div>

      <Fab
        onClick={value !== '' ? () => sendMessage() : undefined}
        color="secondary"
        size="medium"
      >
        {value === '' && <Mic />}
        {value !== '' && <Send />}
      </Fab>
    </div>
  )
}
