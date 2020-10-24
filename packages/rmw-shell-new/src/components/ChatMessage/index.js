import React from 'react'
import Paper from '@material-ui/core/Paper'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useTheme } from '@material-ui/core/styles'

export default function ({ message: data }) {
  const theme = useTheme()
  const { auth } = useAuth()
  const { authorUid, message } = data?.val || {}

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
      <div>{message}</div>
    </Paper>
  )
}
