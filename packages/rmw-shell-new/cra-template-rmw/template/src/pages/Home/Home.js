import React, { useContext, useEffect } from 'react'
import { useIntl } from 'react-intl'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import { useFirebase } from 'rmw-shell/lib/providers/Firebase'
import { usePaths } from 'rmw-shell/lib/providers/Firebase/Paths'
import { useSelector } from 'react-redux'
import { getPath } from 'firekit'
import { destroyList } from 'firekit/lib/store/lists/actions'

const HomePage = ({ watchList: watchList2 }) => {
  const intl = useIntl()
  const { destroyPath } = useFirebase()
  const { watchPath, getPath, clearPath } = usePaths()
  const users_count = getPath('users_count', 0) //useSelector((state) => getPath(state, 'users_count', 0))

  useEffect(() => {
    watchPath('users_count')
    return () => clearPath('users_count')
  }, [])

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
export default HomePage
