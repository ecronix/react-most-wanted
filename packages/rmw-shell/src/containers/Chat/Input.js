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
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useLists } from 'rmw-shell/lib/providers/Firebase/Lists'
import { getLocation } from 'rmw-shell/lib/utils/location'
import { CircularProgress } from '@material-ui/core'
import { getDatabase, ref, set, push, serverTimestamp } from 'firebase/database'

export default function ({ path }) {
  const theme = useTheme()
  const intl = useIntl()
  const { auth } = useAuth()
  const [value, setValue] = useState('')
  const [isUploading, setUploading] = useState(false)
  const { firebaseApp } = useLists()
  const db = getDatabase()

  const uploadSelectedFile = (file) => {
    if (file === null) {
      return
    }

    if ((file.size / 1024 / 1024).toFixed(4) > 20) {
      //file larger than 10mb
      alert(intl.formatMessage({ id: 'max_file_size' }))
      return
    }

    setUploading(true)

    let reader = new FileReader()

    const key = push(ref(db, '/user_chat_messages/'))

    reader.onload = (fileData) => {
      let uploadTask = firebaseApp
        .storage()
        .ref(`/user_chats/${auth.uid}/${key}.jpg`)
        .putString(fileData.target.result, 'data_url')

      uploadTask.on(
        'state_changed',
        () => {},
        (error) => {
          console.log(error)
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            sendMessage({
              type: 'image',
              message: '',
              image: downloadURL,
              key,
            })
            setUploading(false)
          })
        }
      )
    }

    reader.readAsDataURL(file)
  }

  const sendMessage = async (props) => {
    let newMessage = {
      created: serverTimestamp(),
      authorName: auth.displayName,
      authorUid: auth.uid,
      authorPhotoUrl: auth.photoURL,
      languageCode: intl.formatMessage({
        id: 'current_locale',
        defaultMessage: 'en-US',
      }),
      ...props,
    }

    await set(push(ref(db, `${path}`)), newMessage)
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
            color: 'black',
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
            if (e.keyCode === 13 && value.trim() != '') {
              e.preventDefault()
              sendMessage({ type: 'text', message: value })
            }
          }}
          type="Text"
        />

        <input
          style={{ display: 'none' }}
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={(e) => {
            uploadSelectedFile(e.target.files[0])
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div>
            <label htmlFor="icon-button-file">
              <IconButton
                disabled={isUploading}
                color="primary"
                aria-label="upload picture"
                component="span"
                size="small"
                edge={false}
              >
                {isUploading && (
                  <CircularProgress
                    color="secondary"
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                )}
                {!isUploading && <CameraAlt />}
              </IconButton>
            </label>
          </div>
        </div>
        <IconButton
          color="primary"
          size="small"
          onClick={async () => {
            try {
              const { coords } = await getLocation()
              const lat = coords?.latitude
              const long = coords?.longitude
              sendMessage({
                type: 'location',
                message: '',
                location: `https://www.google.com/maps/place/${lat}+${long}/@${lat},${long}`,
                location_lat: lat,
                location_lng: long,
              })
            } catch (error) {}
          }}
        >
          <MyLocation />
        </IconButton>
      </div>

      <Fab
        onClick={
          value !== ''
            ? () => sendMessage({ type: 'text', message: value })
            : undefined
        }
        color="secondary"
        size="medium"
      >
        {value === '' && <Mic />}
        {value !== '' && <Send />}
      </Fab>
    </div>
  )
}
