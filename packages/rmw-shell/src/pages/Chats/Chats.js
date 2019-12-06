import Activity from '../../containers/Activity'
import ChatsList from '../../containers/Chat/ChatsList'
import Message from '@material-ui/icons/Message'
import React from 'react'
import { injectIntl } from 'react-intl'

const Chats = props => {
  const {intl}=props

  return  <Activity title={intl.formatMessage({ id: 'chats' })}>
    <div
      style={{
        height: '100%',
        width: '100%',
        alignItems: 'strech',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        flexDirection: 'row'
      }}
    >
      <ChatsList {...props} />
      <div style={{ width: '100%', height: '100%' }}>
        <Message color="disabled" style={{ width: 192, height: 192, fontSize: 150 }} />
      </div>
    </div>
  </Activity>
    
}

export default injectIntl(Chats)
