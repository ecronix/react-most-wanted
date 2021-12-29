import React, { useEffect } from 'react'
import { useLists } from 'rmw-shell/lib/providers/Firebase/Lists'
import ListPage from 'material-ui-shell/lib/containers/Page/ListPage'
import { useIntl } from 'react-intl'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from 'base-shell/lib/providers/Auth'
import UserRow from 'rmw-shell/lib/components/UserRow'
import { getDatabase, ref, set } from 'firebase/database'

export default function () {
  const { watchList, getList, clearList, isListLoading } = useLists()
  const { auth } = useAuth()
  const intl = useIntl()
  const navigate = useNavigate()
  const { uid } = useParams()
  const groupAdminsPath = `group_chats/${uid}/admins`
  const db = getDatabase()

  useEffect(() => {
    watchList('users')
    watchList('admins')
    watchList(groupAdminsPath)
    return () => {
      clearList(groupAdminsPath)
    }
  }, [watchList, clearList, groupAdminsPath])

  const admins = getList('admins')
  const members = getList(groupAdminsPath)

  const list = getList('users')
    .map(({ key, val }) => {
      return { key, ...val }
    })
    .filter((u) => u.key !== auth.uid)

  const isChecked = (key) => {
    return members.find((m) => m.key === key)
  }

  const handleRowClick = async (user) => {
    await set(
      ref(db, groupAdminsPath).child(user.key),
      isChecked(user.key) ? null : true
    )
  }

  return (
    <React.Fragment>
      <ListPage
        name="users"
        list={list}
        Row={(p) => {
          return (
            <UserRow
              {...p}
              admins={admins}
              handleRowClick={handleRowClick}
              hasCheckbox
              isChecked={isChecked(p.data.key)}
            />
          )
        }}
        listProps={{ itemSize: 82 }}
        getPageProps={(list) => {
          return {
            pageTitle: intl.formatMessage({
              id: 'edit_admins',
              defaultMessage: 'Edit admins',
            }),
            isLoading: isListLoading('users'),
            onBackClick: () => {
              navigate(-1)
            },
          }
        }}
      />
    </React.Fragment>
  )
}
