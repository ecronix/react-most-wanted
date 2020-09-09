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

  return (
    <Page
      pageTitle={intl.formatMessage({ id: 'home', defaultMessage: 'Home' })}
    >
      <Scrollbar
        style={{ height: '100%', width: '100%', display: 'flex', flex: 1 }}
      >
        {intl.formatMessage({ id: 'users', defaultMessage: 'Users' })}
      </Scrollbar>
    </Page>
  )
}
export default Users
