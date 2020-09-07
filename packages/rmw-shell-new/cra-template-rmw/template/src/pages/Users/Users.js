import React, { useContext, useEffect } from 'react'
import { useIntl } from 'react-intl'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import { useFirebase } from 'rmw-shell/lib/providers/Firebase'
import { useSelector } from 'react-redux'
import { getPath } from 'firekit'
import { destroyList } from 'firekit/lib/store/lists/actions'

const Users = ({ watchList: watchList2 }) => {
  const intl = useIntl()
  const { watchPath, destroyPath } = useFirebase()
  const path = 'users_count'
  const users_count = useSelector((state) => getPath(state, 'users_count', 0))

  useEffect(() => {
    watchPath(path)

    return () => {
      destroyPath(path)
    }
  }, [])

  console.log('test_count', users_count)

  return (
    <Page
      pageTitle={intl.formatMessage({ id: 'home', defaultMessage: 'Home' })}
    >
      <Scrollbar
        style={{ height: '100%', width: '100%', display: 'flex', flex: 1 }}
      >
        {intl.formatMessage({ id: 'home', defaultMessage: 'Home' })}
        <br />
        {intl.formatMessage({
          id: 'users_count',
          defaultMessage: 'Users count',
        })}
        <br />
        {users_count}
      </Scrollbar>
    </Page>
  )
}
export default Users
