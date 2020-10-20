import Avatar from '@material-ui/core/Avatar'
import Chat from 'rmw-shell/lib/containers/Chat'
import ChatIcon from '@material-ui/icons/Chat'
import Group from '@material-ui/icons/Group'
import Person from '@material-ui/icons/Person'
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
import { Typography } from '@material-ui/core'

const Row = ({ data, index, style }) => {
  const history = useHistory()
  const { displayName = '', lastMessage = '', key, photoURL, path = '' } = data

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
          <Avatar src={photoURL}>
            {path !== '' && <Group />}
            {path === '' && <Person />}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={displayName} secondary={lastMessage} />
      </ListItem>
      <Divider variant="inset" />
    </div>
  )
}

export default function () {
  const intl = useIntl()
  const history = useHistory()
  const { uid = '' } = useParams()
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

  const showChats = matches || !uid
  const showMessages = matches || uid

  const currentChat = chats.find((c) => {
    return c.key === uid
  })

  const path = currentChat?.path || `user_chat_messages/${auth.uid}/${uid}`
  let title = intl.formatMessage({ id: 'chats', defaultMessage: 'Chats' })

  if (currentChat) {
    title = currentChat?.displayName
    /*
    title = (
      <div>
        <Avatar>
          <Avatar src={currentChat?.photoURL}>
            {currentChat?.path !== '' && <Group />}
            {currentChat?.path === '' && <Person />}
          </Avatar>
        </Avatar>
        <Typography>{currentChat?.displayName}</Typography>
      </div>
    )
    */
  }

  return (
    <Page
      onBackClick={
        !matches && uid
          ? () => {
              history.replace('/chats')
            }
          : undefined
      }
      pageTitle={title}
    >
      <div style={{ height: '100%', display: 'flex' }}>
        {showChats && (
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
        )}
        {showMessages && (
          <div style={{ flex: 1 }}>
            <Chat path={path} />
          </div>
        )}
      </div>
    </Page>
  )
}
