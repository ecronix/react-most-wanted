import AltIconAvatar from '../../components/AltIconAvatar'
import Close from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Notifications from '@material-ui/icons/Notifications'
import Paper from '@material-ui/core/Paper'
import React from 'react'
import { ThemeProvider, useTheme } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'


export const NotificationToast = props => {
  const { notification, closeToast } = props

  const theme = useTheme()

  const type = theme.palette.type === 'light' ? 'dark' : 'light'

  const innerTheme = createMuiTheme({
    palette: {
      type
    }
  })

  const { icon, title, body, autoClose}= notification


  return (
    <ThemeProvider theme={innerTheme}>
      <Paper style={{ margin: -8, marginBottom:-8 }}>
        <List component='div'>
          <ListItem
          
            onClick={() => {
              notification.onClick()
            }}
          >
            <ListItemIcon>
              <AltIconAvatar src={icon} icon={<Notifications fontSize='large' />} />
            </ListItemIcon>
            <ListItemText primary={title} secondary={body} />
            <ListItemSecondaryAction onClick={closeToast}>
              <IconButton edge='end' aria-label='close'>
                <Close />
              </IconButton>
            </ListItemSecondaryAction>
          
          </ListItem>
        </List>
        {autoClose && <LinearProgress color="secondary" variant='determinate' value={0}/>}
      </Paper>
    </ThemeProvider>
  )
}

export default NotificationToast
