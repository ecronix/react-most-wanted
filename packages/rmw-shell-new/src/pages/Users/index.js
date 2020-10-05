import React, { useEffect } from 'react'
import { useLists } from 'rmw-shell/lib/providers/Firebase/Lists'
import ListPage from 'material-ui-shell/lib/containers/Page/ListPage'
import { useIntl } from 'react-intl'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar'
import Mail from '@material-ui/icons/Mail'
import Star from '@material-ui/icons/Star'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import {
  GoogleIcon,
  FacebookIcon,
  GitHubIcon,
  TwitterIcon,
} from 'rmw-shell/lib/components/Icons'
import Badge from '@material-ui/core/Badge'

const fields = [
  {
    name: 'displayName',
    label: 'Name',
  },
]

const getProviderIcon = (id) => {
  const iconProps = {
    color: 'primary',
    style: {
      height: 20,
      width: 20,
    },
  }

  if (id === 'google.com') {
    return <GoogleIcon {...iconProps} />
  }
  if (id === 'facebook.com') {
    return <FacebookIcon {...iconProps} />
  }
  if (id === 'github.com') {
    return <GitHubIcon {...iconProps} />
  }
  if (id === 'twitter.com') {
    return <TwitterIcon {...iconProps} />
  }

  return <Mail {...iconProps} />
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

  const Row = ({ data, index, style }) => {
    const { displayName = '', key, photoURL, providerData = [] } = data

    let isAdmin = false

    admins.map((a) => {
      if (a.key === key) {
        isAdmin = true
      }
    })

    return (
      <div key={key} style={style}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Badge
              invisible={!isAdmin}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              badgeContent={
                <Star
                  style={{
                    width: 15,
                    padding: 0,
                  }}
                />
              }
              color="secondary"
            >
              <Avatar src={photoURL} style={{ height: 45, width: 45 }} />
            </Badge>
          </ListItemAvatar>

          <ListItemText
            primary={`${displayName}`}
            secondary={
              <React.Fragment>
                {providerData.map((p) => {
                  return getProviderIcon(p.providerId)
                })}
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
