import Chip from '@material-ui/core/Chip'
import Done from '@material-ui/icons/Done'
import DoneAll from '@material-ui/icons/DoneAll'
import Paper from '@material-ui/core/Paper'
import React, { useEffect } from 'react'
import moment from 'moment'
import { Typography } from '@material-ui/core'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useConfig } from 'base-shell/lib/providers/Config'
import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { useLists } from 'rmw-shell/lib/providers/Firebase/Lists'
import { useTheme } from '@material-ui/core/styles'

const getMapLoc = (loc) => {
  let lat = 0
  let lng = 0

  if (loc) {
    const data = loc.split('@') ? loc.split('@')[1] : false
    if (data) {
      lat = data.split(',')[0]
      lng = data.split(',')[1]
    }
  }

  return { lat, lng }
}

export default function ({
  message: data,
  path,
  uid,
  userChanged = false,
  dateChanged = false,
}) {
  const history = useHistory()
  const theme = useTheme()
  const { auth } = useAuth()
  const { appConfig } = useConfig()
  const { firebaseApp } = useLists()
  const {
    authorUid,
    authorPhotoUrl = null,
    authorName = '',
    message = '',
    type,
    location = '',
    image,
    isSend,
    isReceived,
    isRead,
    created = '',
  } = data?.val || {}
  const intl = useIntl()
  const isMe = auth.uid === authorUid
  const isLink = message.indexOf('https://') !== -1

  const days = moment(created).diff(moment(), 'days')

  useEffect(() => {
    if (authorUid && auth.uid !== authorUid && !isRead) {
      firebaseApp.database().ref(`${path}/${uid}`).update({
        isRead: true,
      })
      firebaseApp
        .database()
        .ref(`user_chats/${auth.uid}/${authorUid}/unread`)
        .remove()
    }
  }, [firebaseApp, path, uid, authorUid, auth, isRead])

  return (
    <React.Fragment>
      {dateChanged && (
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <div>
            <Chip
              size="small"
              style={{
                fontSize: 10,
                color: 'grey',
                backgroundColor: theme.palette.grey[200],
              }}
              label={`${
                created
                  ? intl.formatRelativeTime(days, 'day', { numeric: 'auto' })
                  : undefined
              }`}
            />
          </div>
        </div>
      )}

      <Paper
        elevation={1}
        style={{
          marginTop: userChanged ? 6 : 2,
          padding: 0,
          maxWidth: 320,
          alignSelf: isMe ? 'flex-end' : 'flex-start',
          borderRadius: userChanged
            ? isMe
              ? '6px 0px 6px 6px'
              : '0px 6px 6px 6px'
            : '6px 6px 6px 6px',
          backgroundColor: isMe
            ? theme.palette.grey[500]
            : theme.palette.grey[300],
          color: isMe ? 'white' : 'black',
          whiteSpace: 'pre-wrap',
          overflowWrap: 'break-word',
        }}
      >
        {!isMe && (
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'flex-start',
              paddingRight: 4,
              paddingLeft: 4,
              cursor: 'pointer',
            }}
            onClick={async () => {
              await firebaseApp
                .database()
                .ref(`user_chats/${auth.uid}/${authorUid}`)
                .update({
                  displayName: authorName,
                  photoURL: authorPhotoUrl,
                })
              history.push(`/chats/${authorUid}`)
            }}
          >
            <Typography
              variant="caption"
              color="secondary"
              style={{
                fontSize: 10,
                padding: 0,
                margin: 0,
              }}
            >
              {authorName}
            </Typography>
          </div>
        )}
        <div style={{ padding: 4, paddingBottom: 0 }}>
          {type === 'text' && !isLink && (
            <Typography variant="body2">{message}</Typography>
          )}
          {type === 'text' && isLink && (
            <a target="_blank" rel="noopener noreferrer" href={message}>
              <Typography variant="body2">{message}</Typography>
            </a>
          )}
          {type === 'image' && (
            <div>
              <img
                style={{
                  height: 'auto',
                  maxWidth: 300,
                  paddingTop: 0,
                  cursor: 'pointer',
                  borderRadius: 5,
                }}
                src={image}
                alt="chat_image"
              />
            </div>
          )}
          {type === 'location' && (
            <img
              alt="location"
              onClick={() => {
                window.open(location, 'blank')
              }}
              style={{
                height: 'auto',
                maxWidth: 300,
                paddingTop: 0,
                cursor: 'pointer',
                borderRadius: 5,
              }}
              src={`https://maps.googleapis.com/maps/api/staticmap?center=%7C${
                location.lat
              },${getMapLoc(location).lng}&zoom=14&size=300x300
&markers=color:red%7Clabel:%7C${getMapLoc(location).lat},${
                getMapLoc(location).lng
              }
&key=${appConfig.googleMaps.apiKey}`}
            />
          )}
        </div>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-end',
            paddingRight: 4,
            paddingLeft: 4,
          }}
        >
          <Typography
            variant="caption"
            style={{
              fontSize: 8,
              padding: 0,
              margin: 0,
              color: 'black',
            }}
          >
            {created ? intl.formatTime(new Date(created)) : undefined}
          </Typography>
          {isSend && isReceived && (
            <DoneAll
              style={{
                fontSize: 11,
                padding: 0,
                paddingLeft: 2,
                bottom: -2,
                color: isRead
                  ? theme.palette.secondary.main
                  : theme.palette.text.primary,
              }}
            />
          )}
          {isSend && !isReceived && (
            <Done
              style={{
                fontSize: 11,
                padding: 0,
                paddingLeft: 2,
                bottom: -2,
                color: isRead
                  ? theme.palette.secondary.main
                  : theme.palette.text.primary,
              }}
            />
          )}
        </div>
      </Paper>
    </React.Fragment>
  )
}
