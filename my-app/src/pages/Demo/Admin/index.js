import React, { useState } from 'react'
import Page from 'material-ui-shell/lib/containers/Page'
import { useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { getFunctions, httpsCallable } from 'firebase/functions'

const Admin = () => {
  const intl = useIntl()
  const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate()

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
        {isLoading && <CircularProgress />}
        {!isLoading && (
          <Button
            variant="contained"
            color="primary"
            onClick={async () => {
              setLoading(true)
              const httpsAdminOnCall = httpsCallable(
                getFunctions(),
                'https-adminOnCall'
                //'https-usersSyncOnCall'
              )

              const { data } = await httpsAdminOnCall()

              const { message } = data || {}

              setLoading(false)

              if (message === 'OK') {
                navigate('/users')
              }
            }}
          >
            {intl.formatMessage({
              id: 'make_me_admin',
              defaultMessage: 'Make me admin',
            })}
          </Button>
        )}
      </div>
    </Page>
  )
}

export default Admin
