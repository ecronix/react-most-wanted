import React, { useEffect, useMemo, useState } from 'react'
import { useLists } from 'rmw-shell/lib/providers/Firebase/Lists'
import ListPage from 'material-ui-shell/lib/containers/Page/ListPage'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import UserRow from 'rmw-shell/lib/components/UserRow'
import { useFilter } from 'material-ui-shell/lib/providers/Filter'
import {
  collection,
  getFirestore,
  getDocs,
  query,
  where,
} from 'firebase/firestore'

const fields = [
  {
    name: 'displayName',
    label: 'Name',
  },
]

export default function () {
  const { watchList, getList } = useLists()
  const intl = useIntl()
  const history = useHistory()
  const [list, setList] = useState([])
  const [isLoading, setLoading] = useState(false)
  const { getFilter } = useFilter()
  const { search = {} } = getFilter('users')
  const searchValue = search.value

  const runSearch = useMemo(
    () => async () => {
      setLoading(true)
      const db = getFirestore()
      const ref = collection(db, 'users')
      const q = query(
        ref,
        where('search', 'array-contains', searchValue.toLowerCase() || '')
      )
      const snap = await getDocs(q)

      const tempLlist = []
      snap.forEach((doc) => {
        tempLlist.push({ key: doc.id, ...doc.data() })
      })

      setList(tempLlist)
      setLoading(false)
    },
    [searchValue]
  )

  useEffect(() => {
    if (searchValue && searchValue !== '') {
      runSearch()
    } else {
      setList([])
    }
  }, [runSearch, searchValue])

  useEffect(() => {
    watchList('admins')
  }, [watchList])

  const admins = getList('admins')

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
      disableFilter
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
          isLoading,
        }
      }}
    />
  )
}
