import React, { useEffect } from 'react'
import { useLists } from 'rmw-shell/lib/providers/Firebase/Lists'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar'
import ChatMessage from 'rmw-shell/lib/components/ChatMessage'
import Input from './Input'

export default function ({ path }) {
  const { watchList, getList, unwatchList } = useLists()

  useEffect(() => {
    watchList(path)

    return () => unwatchList(path)
  }, [path])

  const messages = getList(path)

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
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingLeft: 8,
              paddingRight: 8,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: 500,
                //maxWidth: 600,
              }}
            >
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
