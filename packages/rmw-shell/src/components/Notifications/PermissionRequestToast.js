import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Notifications from '@material-ui/icons/Notifications'
import Paper from '@material-ui/core/Paper'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import moment from 'moment'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/styles'

export const PermissionRequestToast = props => {
  const {
    auth,
    notificationPermissionRequested,
    setPersistentValue,
    simpleValues,
    setSimpleValue,
    messaging,
    intl,
    appConfig,
    closeToast,
    initializeMessaging
  } = props

  const theme = useTheme()

  const type = theme.palette.type === 'light' ? 'dark' : 'light'

  const innerTheme = createMuiTheme({
    palette: {
      type
    }
  })

  return (
    <ThemeProvider theme={innerTheme}>
      <Paper style={{ margin: -8 }}>
        <Typography>
          <ListItem>
            <ListItemIcon>
              <Notifications color="secondary" fontSize="large" />
            </ListItemIcon>
            <ListItemText primary={intl.formatMessage({ id: 'enable_notifications_message' })} />
          </ListItem>

          <DialogActions>
            <Button
              onClick={() => {
                setPersistentValue('notificationPermissionRequested', moment())
                initializeMessaging(props)
                closeToast()
              }}
            >
              {intl.formatMessage({ id: 'enable' })}
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                setPersistentValue('notificationPermissionRequested', moment())
                closeToast()
              }}
            >
              {intl.formatMessage({ id: 'no_thanks' })}
            </Button>
          </DialogActions>
        </Typography>
      </Paper>
    </ThemeProvider>
  )
}

export default PermissionRequestToast
