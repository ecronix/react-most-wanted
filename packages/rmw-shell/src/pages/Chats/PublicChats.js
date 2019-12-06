import Activity from '../../containers/Activity'
import Input from '../../containers/Chat/Input'
import Messages from '../../containers/Chat/Messages'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'

export class Chats extends Component {
  render() {
    const { intl } = this.props

    return (
      <Activity title={intl.formatMessage({ id: 'chats' })}>
        <div
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'strech',
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'row'
          }}
        >
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', marginLeft: 0, flexGrow: 1 }}>
            <Messages path={'public_chats'} receiverPath={'public_chats'} {...this.props} />
            <Input path={'public_chats'} receiverPath={'public_chats'} {...this.props} />
          </div>
        </div>
      </Activity>
    )
  }
}

export default connect()(injectIntl(withRouter(Chats)))
