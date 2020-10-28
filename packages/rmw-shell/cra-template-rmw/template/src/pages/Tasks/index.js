import Avatar from '@material-ui/core/Avatar'
import Assignment from '@material-ui/icons/Assignment'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import React from 'react'
import { ListPage } from 'rmw-shell/lib/containers/Page'
import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'

const path = 'tasks'

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

const Row = ({ data, index, style }) => {
  const { title = '', helper = {}, key } = data
  const history = useHistory()

  return (
    <div key={key} style={style}>
      <ListItem
        button
        alignItems="flex-start"
        style={{ height: 72 }}
        onClick={() => {
          history.push(`${path}/${key}`)
        }}
      >
        <ListItemAvatar>
          <Avatar>
            <Assignment />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={title} secondary={helper?.label} />
      </ListItem>
      <Divider variant="inset" />
    </div>
  )
}

// eslint-disable-next-lin
export default function () {
  const intl = useIntl()
  const history = useHistory()

  return (
    <ListPage
      fields={fields}
      path={'public_tasks'}
      createGrant="create_task"
      Row={Row}
      listProps={{ itemSize: 72 }}
      getPageProps={() => {
        return {
          pageTitle: intl.formatMessage({
            id: path,
            defaultMessage: 'Tasks',
          }),
        }
      }}
      onCreateClick={() => {
        history.push('/create_task')
      }}
    />
  )
}
