import Avatar from '@mui/material/Avatar'
import Assignment from '@mui/icons-material/Assignment'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import React, { useCallback } from 'react'
import { ListPage } from 'rmw-shell/lib/containers/Page'
import { useNavigate } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { useTheme as useAppTheme } from 'material-ui-shell/lib/providers/Theme'
import { getDatabase, ref, query, limitToLast } from 'firebase/database'

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
  const navigate = useNavigate()
  const { isRTL } = useAppTheme()

  return (
    <div key={key} style={{ ...style, direction: isRTL ? 'rtl' : 'ltr' }}>
      {/* james- revisit this code */}
      <ListItem
        button
        alignItems="flex-start"
        style={{ height: 72 }}
        onClick={() => {
          navigate(`/${path}/${key}`)
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

const Tasks = () => {
  const intl = useIntl()
  const navigate = useNavigate()

  const getRef = useCallback(() => {
    return query(ref(getDatabase(), `public_tasks`), limitToLast(50))
  }, [])

  return (
    <ListPage
      reverse
      fields={fields}
      path={'public_tasks'}
      getRef={getRef}
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
        navigate('/create_task')
      }}
    />
  )
}

export default Tasks
