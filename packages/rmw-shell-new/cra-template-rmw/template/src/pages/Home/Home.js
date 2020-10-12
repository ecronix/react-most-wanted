import Page from 'material-ui-shell/lib/containers/Page/Page'
import React, { useContext, useEffect } from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import { useFirebase } from 'rmw-shell/lib/providers/Firebase'
import { useIntl } from 'react-intl'
import { usePaths } from 'rmw-shell/lib/providers/Firebase/Paths'
import { useAuth } from 'base-shell/lib/providers/Auth'

const HomePage = ({ watchList: watchList2 }) => {
  const intl = useIntl()
  const { auth } = useAuth()
  const { watchPath, getPath, clearPath } = usePaths()
  const users_count = getPath('users_count', 0)

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
        <br />

        <button
          onClick={() => {
            console.log('auth', auth)
          }}
        >
          log
        </button>
      </Scrollbar>
    </Page>
  )
}
export default HomePage
