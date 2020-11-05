import React, { useEffect } from 'react'
import { useLists } from 'rmw-shell/lib/providers/Firebase/Lists'
import ListPage from 'material-ui-shell/lib/containers/Page/ListPage'
import { useIntl } from 'react-intl'
import GroupAdd from '@material-ui/icons/GroupAdd'
import { useHistory } from 'react-router-dom'
import { useAuth } from 'base-shell/lib/providers/Auth'
import UserRow from 'rmw-shell/lib/components/UserRow'

export default function () {
  const { firebaseApp, watchList, getList, isListLoading } = useLists()
  const { auth } = useAuth()
  const intl = useIntl()
  const history = useHistory()

  useEffect(() => {
    watchList('users')
    watchList('admins')
  }, [watchList])

  const admins = getList('admins')

  const list = getList('users')
    .map(({ key, val }) => {
      return { key, ...val }
    })
    .filter((u) => u.key !== auth.uid)

  list.unshift({
    key: 'new_group',
    displayName: intl.formatMessage({
      id: 'group_chat',
      defaultMessage: 'Group chat',
    }),
    secondaryText: intl.formatMessage({
      id: 'create_group_chat',
      defaultMessage: 'Create new group chat',
    }),
    icon: <GroupAdd />,
    onClick: () => {
      history.push(`/create_group_chat`)
    },
  })

  const handleRowClick = (user) => {
    const key = user.key
    const userValues = user
    const userChatsRef = firebaseApp
      .database()
      .ref(`/user_chats/${auth.uid}/${key}`)

    const chatData = {
      displayName: userValues.displayName,
      photoURL: userValues.photoURL ? userValues.photoURL : '',
      lastMessage: '',
    }

    userChatsRef.update({ ...chatData })

    history.push(`/chats/${key}`)
  }

  return (
    <ListPage
      name="users"
      list={list}
      Row={(p) => {
        return (
          <UserRow {...p} admins={admins} handleRowClick={handleRowClick} />
        )
      }}
      listProps={{ itemSize: 82 }}
      getPageProps={(list) => {
        return {
          pageTitle: intl.formatMessage({
            id: 'chat_with',
            defaultMessage: 'Chat with',
          }),
          isLoading: isListLoading('users'),
          onBackClick: () => {
            history.goBack()
          },
        }
      }}
    />
  )
}
