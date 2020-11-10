import React from 'react'
import Page from 'material-ui-shell/lib/containers/Page'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { useFirebase } from 'rmw-shell/lib/providers/Firebase'

const Admin = () => {
  const intl = useIntl()
  const history = useHistory()
  const { firebaseApp } = useFirebase()

  return (
    <Page
      pageTitle={intl.formatMessage({ id: 'admin', defaultMessage: 'Admin' })}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <p></p>REMOVE THIS IN PRODUCTION!!!
        <p>And delete the cloud function "httpsAdminOnCall"</p>
        <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            const httpsAdminOnCall = firebaseApp
              .functions()
              .httpsCallable('httpsAdminOnCall')

            const { data } = await httpsAdminOnCall()
            const { message } = data || {}

            if (message === 'OK') {
              history.push('/users')
            }
          }}
        >
          {intl.formatMessage({
            id: 'make_me_admin',
            defaultMessage: 'Make me admin',
          })}
        </Button>
      </div>
    </Page>
  )
}

export default Admin
