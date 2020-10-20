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

export default function () {
  const theme = useTheme()
  const intl = useIntl()
  const [value, setValue] = useState('')

  const sendMessage = () => {}

  return (
    <div style={{ display: 'flex', padding: 8, alignItems: 'center' }}>
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

      <Fab color="secondary" size="medium">
        {value === '' && <Mic />}
        {value !== '' && <Send />}
      </Fab>
    </div>
  )
}
