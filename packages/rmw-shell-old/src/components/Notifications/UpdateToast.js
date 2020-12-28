import AltIconAvatar from '../../components/AltIconAvatar'
import Close from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import React from 'react'
import UpdateIcon from '@material-ui/icons/Update'
import { ThemeProvider, useTheme } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { injectIntl } from 'react-intl'


export const UpdateToast = props => {
  const {handleUpdate, closeToast, intl } = props

  const theme = useTheme()

  const type = theme.palette.type === 'light' ? 'dark' : 'light'

  const innerTheme = createMuiTheme({
    palette: {
      type
    }
  })

  const title = intl ? intl.formatMessage({ id: 'update_title' }) : 'Update available!'
  const message = intl ? intl.formatMessage({ id: 'update_message' }) : 'Click here to get the new version.'

  return (
    <ThemeProvider theme={innerTheme}>
      <Paper style={{ margin: -8, marginBottom: -8 }}>
        <List component='div'>
          <ListItem
            onClick={handleUpdate}
          >
            <ListItemIcon>
              <AltIconAvatar  icon={<UpdateIcon fontSize='large' />} />
            </ListItemIcon>
            <ListItemText primary={title} secondary={message} />
            <ListItemSecondaryAction onClick={closeToast}>
              <IconButton edge='end' aria-label='close'>
                <Close />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>
    </ThemeProvider>
  )
}

export default injectIntl(UpdateToast)
