import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import { IconButton } from '@material-ui/core'
import { useIntl } from 'react-intl'
import {
  GoogleIcon,
  FacebookIcon,
  GitHubIcon,
  TwitterIcon,
} from 'rmw-shell/lib/components/Icons'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import { usePaths } from 'rmw-shell/lib/providers/Firebase/Paths'
import { useParams, useHistory } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import AccountBox from '@material-ui/icons/AccountBox'
import Lock from '@material-ui/icons/Lock'
import Person from '@material-ui/icons/Person'
import Email from '@material-ui/icons/Email'

export default function () {
  const intl = useIntl()
  const history = useHistory()
  const { watchPath, getPath } = usePaths()
  const { uid, tab = 'main' } = useParams()

  const getProviderIcon = (id) => {
    if (id === 'password') {
      return <Email />
    }
    if (id === 'google.com') {
      return <GoogleIcon />
    }
    if (id === 'facebook.com') {
      return <FacebookIcon />
    }
    if (id === 'github.com') {
      return <GitHubIcon />
    }
    if (id === 'twitter.com') {
      return <TwitterIcon />
    }

    return null
  }

  const path = `users/${uid}`

  useEffect(() => {
    watchPath(path)
  }, [path])

  const user = getPath(path, {})

  const { photoURL = '', displayName = '', email = '', providerData = [] } =
    user || {}

  console.log('providerData', providerData)

  return (
    <Page
      onBackClick={() => {
        history.goBack()
      }}
      pageTitle={intl.formatMessage({
        id: 'user',
        defaultMessage: 'User',
      })}
    >
      <div style={{ height: '100%', overflow: 'hidden' }}>
        <AppBar position="static">
          <Tabs
            value={tab}
            onChange={(e, t) => {
              history.replace(`/users/${uid}/${t}`)
            }}
            centered
          >
            <Tab value="main" icon={<Person className="material-icons" />} />
            <Tab
              value="roles"
              icon={<AccountBox className="material-icons" />}
            />

            <Tab value="grants" icon={<Lock className="material-icons" />} />
          </Tabs>
        </AppBar>
        <div style={{ height: '100%' }}>
          {tab === 'main' && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Paper
                elevation={3}
                style={{
                  position: 'relative',
                  //width: 300,
                  //height: 300,
                  borderRadius: 18,
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: 18,
                }}
              >
                <Avatar
                  style={{ width: 120, height: 120, marginTop: -70 }}
                  alt="User Picture"
                  src={photoURL}
                />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    marginTop: 18,
                    marginBottom: 18,
                  }}
                >
                  <Typography variant="h4">{displayName}</Typography>
                  <Typography variant="h6">{email}</Typography>
                  <div
                    style={{
                      margin: 18,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {providerData.map((so) => {
                      return getProviderIcon(so.providerId) ? (
                        <IconButton color="primary" key={so}>
                          {getProviderIcon(so.providerId)}
                        </IconButton>
                      ) : null
                    })}
                  </div>
                </div>
              </Paper>
            </div>
          )}
        </div>
      </div>
    </Page>
  )
}
