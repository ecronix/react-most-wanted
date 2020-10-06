import AccountBoxIcon from '@material-ui/icons/AccountBox'
import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListPage from 'material-ui-shell/lib/containers/Page/ListPage'
import Mail from '@material-ui/icons/Mail'
import React, { useEffect } from 'react'
import Star from '@material-ui/icons/Star'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import { useLists } from 'rmw-shell/lib/providers/Firebase/Lists'

const fields = [
  {
    name: 'name',
    label: 'Name',
  },
  {
    name: 'description',
    label: 'Description',
  },
]

export default function () {
  const { watchList, getList } = useLists()
  const intl = useIntl()
  const history = useHistory()

  useEffect(() => {
    watchList('roles')
  })

  const list = getList('roles').map(({ key, val }) => {
    return { key, ...val }
  })

  const Row = ({ data, index, style }) => {
    const {
      name = '',
      description = '',
      key,
      photoURL,
      providerData = [],
    } = data

    return (
      <div key={key} style={style}>
        <ListItem
          alignItems="flex-start"
          style={{ height: 72, cursor: 'pointer' }}
          onClick={() => {
            history.push(`/roles/${key}`)
          }}
        >
          <ListItemAvatar>
            <Avatar>
              <AccountBoxIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={`${name}`} secondary={description} />
        </ListItem>
        <Divider variant="inset" />
      </div>
    )
  }

  return (
    <ListPage
      name="roles"
      list={list}
      fields={fields}
      Row={Row}
      listProps={{ itemSize: 72 }}
      getPageProps={(list) => {
        return {
          pageTitle: intl.formatMessage(
            {
              id: 'roles',
              defaultMessage: 'Roles',
            },
            { count: list.length }
          ),
        }
      }}
    />
  )
}
