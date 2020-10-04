import React, { useEffect } from 'react'
import { useLists } from 'rmw-shell/lib/providers/Firebase/Lists'
import ListPage from 'material-ui-shell/lib/containers/Page/ListPage'
import { useIntl } from 'react-intl'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar'
import Mail from '@material-ui/icons/Mail'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import {
  GoogleIcon,
  FacebookIcon,
  GitHubIcon,
  TwitterIcon,
} from 'rmw-shell/lib/components/Icons'

const fields = [
  {
    name: 'displayName',
    label: 'Name',
  },
]

const getProviderIcon = (id) => {
  if (id === 'google.com') {
    return <GoogleIcon color="primary" />
  }
  if (id === 'facebook.com') {
    return <FacebookIcon color="primary" />
  }
  if (id === 'github.com') {
    return <GitHubIcon color="primary" />
  }
  if (id === 'twitter.com') {
    return <TwitterIcon color="primary" />
  }

  return <Mail color="primary" />
}

export default function () {
  const { watchList, getList } = useLists()
  const intl = useIntl()

  useEffect(() => {
    watchList('users')
    watchList('admins')
  })

  const admins = getList('admins')

  const list = getList('users').map(({ key, val }) => {
    return { key, ...val }
  })

  console.log('admins', admins)

  const Row = ({ data, index, style }) => {
    const { displayName = '', key, photoURL, providerData = [] } = data
    console.log('Data', data)

    return (
      <div key={key} style={style}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar src={photoURL} />
          </ListItemAvatar>

          <ListItemText
            primary={`${displayName}`}
            secondary={
              <React.Fragment>
                <div>
                  {providerData.map((p) => {
                    return getProviderIcon(p.providerId)
                  })}
                </div>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider />
      </div>
    )
  }

  return (
    <ListPage
      name="users"
      list={list}
      fields={fields}
      Row={Row}
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
        }
      }}
    />
  )
}
