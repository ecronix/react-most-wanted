import Avatar from '@mui/material/Avatar'
import Business from '@mui/icons-material/Business'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
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
