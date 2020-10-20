import Avatar from '@material-ui/core/Avatar'
import Chat from 'rmw-shell/lib/containers/Chat'
import ChatIcon from '@material-ui/icons/Chat'
import Divider from '@material-ui/core/Divider'
import Fab from '@material-ui/core/Fab'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Page from 'material-ui-shell/lib/containers/Page'
import React, { useEffect } from 'react'
import VirtualList from 'material-ui-shell/lib/containers/VirtualList'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useHistory, useParams } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { useLists } from 'rmw-shell/lib/providers/Firebase/Lists'
import { useTheme } from '@material-ui/core/styles'

const Row = ({ data, index, style }) => {
  const history = useHistory()
  const { displayName = '', message = '', key, photoURL } = data

  return (
    <div key={key} style={style}>
      <ListItem
        button
        alignItems="flex-start"
        style={{ height: 72 }}
        onClick={() => {
          history.replace(`/chats/${key}`)
        }}
      >
        <ListItemAvatar>
          <Avatar src={photoURL} />
        </ListItemAvatar>
        <ListItemText primary={displayName} secondary={message} />
      </ListItem>
      <Divider variant="inset" />
    </div>
  )
}

export default function () {
  const intl = useIntl()

  const { uid } = useParams()
  const { auth } = useAuth()
  const { watchList, getList, unwatchList } = useLists()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const chatsPath = `user_chats/${auth.uid}`

  useEffect(() => {
    watchList(chatsPath)

    return () => unwatchList(chatsPath)
  }, [])

  const chats = getList(chatsPath).map((c) => {
    return { key: c.key, ...c.val }
  })

  return (
    <Page
      pageTitle={intl.formatMessage({ id: 'chats', defaultMessage: 'Chats' })}
    >
      <div style={{ height: '100%', display: 'flex' }}>
        <div
          style={{
            width: matches ? 300 : '100%',
            height: '100%',
          }}
        >
          <VirtualList
            list={chats}
            name={'user_chats'}
            listProps={{ itemSize: 72 }}
            Row={Row}
          />
          <div style={{ position: 'absolute', bottom: 15, right: 15 }}>
            <Fab color="secondary">
              <ChatIcon />
            </Fab>
          </div>
        </div>
        {matches && (
          <div style={{ width: '100%' }}>
            <Chat uid={uid} />
          </div>
        )}
      </div>
    </Page>
  )
}
