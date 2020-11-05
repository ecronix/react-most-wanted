import React, { useEffect } from 'react'
import { useLists } from 'rmw-shell/lib/providers/Firebase/Lists'
import ListPage from 'material-ui-shell/lib/containers/Page/ListPage'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import UserRow from 'rmw-shell/lib/components/UserRow'

const fields = [
  {
    name: 'displayName',
    label: 'Name',
  },
]

export default function () {
  const { watchList, getList, isListLoading } = useLists()
  const intl = useIntl()
  const history = useHistory()

  useEffect(() => {
    watchList('users')
    watchList('admins')
  }, [watchList])

  const admins = getList('admins')

  const list = getList('users').map(({ key, val }) => {
    return { key, ...val }
  })

  const handleRowClick = (data) => {
    history.push(`/users/${data.key}`)
  }

  return (
    <ListPage
      name="users"
      list={list}
      fields={fields}
      Row={(p) => {
        return (
          <UserRow {...p} admins={admins} handleRowClick={handleRowClick} />
        )
      }}
      listProps={{ itemSize: 82 }}
      getPageProps={(list) => {
        return {
          pageTitle: intl.formatMessage(
            {
              id: 'users_page',
              defaultMessage: 'Users {count}',
            },
            { count: list.length }
          ),
          isLoading: isListLoading('users'),
        }
      }}
    />
  )
}
