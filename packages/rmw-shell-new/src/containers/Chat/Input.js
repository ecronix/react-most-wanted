import React from 'react'
import Input from '@material-ui/core/Input'
import { useTheme } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import Mic from '@material-ui/icons/Mic'
import Attachment from '@material-ui/icons/Attachment'
import { useIntl } from 'react-intl'

export default function () {
  const theme = useTheme()
  const intl = useIntl()

  return (
    <div style={{ display: 'flex', padding: 8, alignItems: 'center' }}>
      <div
        style={{
          margin: 0,
          marginLeft: 18,
          marginRight: 18,
          backgroundColor: theme.palette.grey[300],
          borderRadius: 18,
          height: '100%',
          flex: 1,
        }}
      >
        <Input
          id="message"
          style={{
            //position: 'absolute',
            height: 50,
            //width: 'calc(100% - 72px)',
            //lineHeight: undefined,
            //top: -6,
            left: 15,
            right: 15,
          }}
          multiline
          rowsMax="2"
          disableUnderline={true}
          onChange={(e) => {
            //this.setState({ value: e.target.value })
          }}
          fullWidth={true}
          autoFocus
          //value={this.state.value}
          autoComplete="off"
          placeholder={intl.formatMessage({
            id: 'write_message_hint',
            defaultMessage: 'Write message',
          })}
          onKeyDown={(e) => {
            /*
          this.handleKeyDown(e, () =>
            this.handleAddMessage('text', this.state.value)
          )
          */
          }}
          type="Text"
        />
      </div>
      <Fab style={{ marginRight: 4 }} color="secondary" size="medium">
        <Attachment />
      </Fab>
      <Fab color="secondary" size="medium">
        <Mic />
      </Fab>
    </div>
  )
}
