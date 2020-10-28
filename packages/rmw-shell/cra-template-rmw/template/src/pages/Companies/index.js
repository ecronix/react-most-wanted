import Avatar from '@material-ui/core/Avatar'
import Business from '@material-ui/icons/Business'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import React from 'react'
import { ListPage } from 'rmw-shell/lib/containers/Page'
import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'

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
  const { name = '', description = '', key } = data
  const history = useHistory()

  return (
    <div key={key} style={style}>
      <ListItem
        button
        alignItems="flex-start"
        style={{ height: 72 }}
        onClick={() => {
          history.push(`/companies/${key}`)
        }}
      >
        <ListItemAvatar>
          <Avatar>
            <Business />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} secondary={description} />
      </ListItem>
      <Divider variant="inset" />
    </div>
  )
}

const Companies = () => {
  const intl = useIntl()
  const history = useHistory()

  return (
    <ListPage
      fields={fields}
      path="companies"
      createGrant="create_company"
      Row={Row}
      listProps={{ itemSize: 72 }}
      getPageProps={() => {
        return {
          pageTitle: intl.formatMessage({
            id: 'companies',
            defaultMessage: 'Companies',
          }),
        }
      }}
      onCreateClick={() => {
        history.push('/create_company')
      }}
    />
  )
}

export default Companies
