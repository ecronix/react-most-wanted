import React, { useEffect } from 'react'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useLists } from 'rmw-shell/lib/providers/Firebase/Lists'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar'
import ChatMessage from 'rmw-shell/lib/components/ChatMessage'
import Input from './Input'

export default function ({ uid }) {
  const { auth } = useAuth()
  const { watchList, getList, unwatchList } = useLists()

  const chatPath = `user_chat_messages/${auth.uid}/${uid}`

  useEffect(() => {
    watchList(chatPath)

    return () => unwatchList(chatPath)
  }, [uid])

  const messages = getList(chatPath)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <div style={{ flexGrow: 1 }}>
        <Scrollbar>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {messages.map((m) => {
                return <ChatMessage key={m.key} message={m} />
              })}
            </div>
          </div>
        </Scrollbar>
      </div>
      <div>
        <Input />
      </div>
    </div>
  )
}
