import Avatar from '@material-ui/core/Avatar'
import Chat from 'rmw-shell/lib/containers/Chat'
import ChatIcon from '@material-ui/icons/Chat'
import Group from '@material-ui/icons/Group'
import Security from '@material-ui/icons/Security'
import Info from '@material-ui/icons/Info'
import People from '@material-ui/icons/People'
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
import { useTheme as useAppTheme } from 'material-ui-shell/lib/providers/Theme'
import { useMessaging } from 'rmw-shell/lib/providers/Firebase/Messaging'
import MoreHoriz from '@material-ui/icons/MoreHoriz'
import Delete from '@material-ui/icons/Delete'
import History from '@material-ui/icons/History'
import {
  ListItemSecondaryAction,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from '@material-ui/core'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import moment from 'moment'

const Row = ({ data, index, style }) => {
  const history = useHistory()
  const intl = useIntl()
  const { auth } = useAuth()
  const { isRTL } = useAppTheme()

  const {
    displayName = '',
    lastMessage = '',
    key,
    photoURL,
    path = '',
    lastCreated = '',
  } = data
  const [anchorEl, setAnchorEl] = React.useState(null)
  const { firebaseApp } = useLists()
  const { uid = '' } = useParams()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDeleteChat = () => {
    firebaseApp.database().ref(`user_chats/${auth.uid}/${key}`).remove()
    handleClose()
  }

  const handleMarkAsUnread = () => {
    firebaseApp.database().ref(`user_chats/${auth.uid}/${key}/unread`).set(1)
    handleClose()
  }

  return (
    <div key={key} style={{...style, direction: isRTL ? 'rtl' : 'ltr'}}>{/* james- revisit this code */}
      <ListItem
        button
        selected={key === uid}
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
        <ListItemText
          primary={displayName}
          secondary={
            <div
              style={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                maxWidth: 170,
                whiteSpace: 'nowrap',
              }}
            >
              {lastMessage}
            </div>
          }
        />
        <ListItemSecondaryAction>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <IconButton
              size="small"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreHoriz />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {path !== '' && (
                <MenuItem
                  onClick={() => {
                    history.push(`/group_chat/${key}`)
                  }}
                >
                  <ListItemIcon>
                    <Info />
                  </ListItemIcon>

                  {intl.formatMessage({
                    id: 'info',
                    defaultMessage: 'Info',
                  })}
                </MenuItem>
              )}
              {path !== '' && (
                <MenuItem
                  onClick={() => {
                    history.push(`/edit_members/${key}`)
                  }}
                >
                  <ListItemIcon>
                    <People />
                  </ListItemIcon>

                  {intl.formatMessage({
                    id: 'members',
                    defaultMessage: 'Members',
                  })}
                </MenuItem>
              )}
              {path !== '' && (
                <MenuItem
                  onClick={() => {
                    history.push(`/edit_admins/${key}`)
                  }}
                >
                  <ListItemIcon>
                    <Security />
                  </ListItemIcon>

                  {intl.formatMessage({
                    id: 'admins',
                    defaultMessage: 'Admins',
                  })}
                </MenuItem>
              )}
              <MenuItem onClick={handleDeleteChat}>
                <ListItemIcon>
                  <Delete />
                </ListItemIcon>
                {path === '' &&
                  intl.formatMessage({
                    id: 'delete_chat',
                    defaultMessage: 'Delete chat',
                  })}
                {path !== '' &&
                  intl.formatMessage({
                    id: 'delete_group_chat',
                    defaultMessage: 'Delete group chat',
                  })}
              </MenuItem>
              <MenuItem onClick={handleMarkAsUnread}>
                <ListItemIcon>
                  <History />
                </ListItemIcon>
                {intl.formatMessage({
                  id: 'martk_as_unread',
                  defaultMessage: 'Mark as unread',
                })}
              </MenuItem>
            </Menu>
            <Typography variant="caption">
              {moment(lastCreated || moment()).format('HH:mm')}
            </Typography>
            <div style={{ height: 5 }}></div>
          </div>
        </ListItemSecondaryAction>
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
  const { requestPermission } = useMessaging()

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const chatsPath = `user_chats/${auth.uid}`

  useEffect(() => {
    watchList(chatsPath)
    requestPermission()

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

  const path =
    currentChat?.path || (uid ? `user_chat_messages/${auth.uid}/${uid}` : false)
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
              <Fab
                color="secondary"
                onClick={() => {
                  history.push('/create_chat')
                }}
              >
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
