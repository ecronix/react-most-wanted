import React from 'react'
import Paper from '@material-ui/core/Paper'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useTheme } from '@material-ui/core/styles'
import { useConfig } from 'base-shell/lib/providers/Config'

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

export default function ({ message: data }) {
  const theme = useTheme()
  const { auth } = useAuth()
  const { appConfig } = useConfig()
  const { authorUid, message, type, location = '', image } = data?.val || {}

  const isMe = auth.uid === authorUid

  return (
    <Paper
      elevation={1}
      style={{
        margin: 2,
        padding: 8,
        maxWidth: 320,
        alignSelf: isMe ? 'flex-end' : 'flex-start',
        borderRadius: isMe ? '6px 0px 6px 6px' : '0px 6px 6px 6px',
        backgroundColor: isMe
          ? theme.palette.grey[500]
          : theme.palette.grey[300],
        color: isMe ? 'white' : 'black',
        whiteSpace: 'pre-wrap',
        overflowWrap: 'break-word',
      }}
    >
      {type === 'text' && <div>{message}</div>}
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
    </Paper>
  )
}
