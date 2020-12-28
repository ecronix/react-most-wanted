import React from 'react'
import { compose } from 'redux'
import { injectIntl } from 'react-intl'
import { withAppConfigs } from '../../contexts/AppConfigProvider'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import Avatar from '@material-ui/core/Avatar'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import ChromeReaderMode from '@material-ui/icons/ChromeReaderMode'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import PersonIcon from '@material-ui/icons/Person'

const styles = theme => ({
  paper: {
    backgroundColor: theme.palette.primary.dark,
    margin: 0,
    padding: 0,
  },
  listItem: {
    color: theme.palette.primary.contrastText,
  },
  icon: {
    color: theme.palette.primary.contrastText,
  },
})

export const DrawerHeader = props => {
  const {
    theme,
    intl,
    auth,
    dialogs,
    setDialogIsOpen,
    classes,
    drawer,
    setDrawerOpen,
    setDrawerUseMinified,
    width,
  } = props

  return (
    <Paper square={true} className={classes.paper}>
      {auth.isAuthorised && (
        <div>
          <List>
            <ListItem>
              {auth.photoURL && (
                <ListItemAvatar>
                  <Avatar src={auth.photoURL} alt="user" />
                </ListItemAvatar>
              )}
              {!auth.photoURL && (
                <ListItemAvatar>
                  <Avatar>
                    {' '}
                    <PersonIcon />{' '}
                  </Avatar>
                </ListItemAvatar>
              )}
              <Hidden smDown implementation="css">
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => {
                      setDrawerOpen(false)
                    }}
                  >
                    <ChromeReaderMode classes={{ root: classes.icon }} />
                  </IconButton>
                  <IconButton
                    className={classes.button}
                    onClick={() => {
                      setDrawerUseMinified(false)
                    }}
                  >
                    {theme.direction === 'rtl' && (
                      <ChevronRight classes={{ root: classes.icon }} />
                    )}
                    {theme.direction !== 'rtl' && (
                      <ChevronLeft classes={{ root: classes.icon }} />
                    )}
                  </IconButton>
                </ListItemSecondaryAction>
              </Hidden>
            </ListItem>

            <ListItem
              onClick={() => {
                setDialogIsOpen('auth_menu', !dialogs.auth_menu)
              }}
            >
              {!drawer.open &&
                width !== 'sm' &&
                width !== 'xs' &&
                auth.photoURL && (
                  <ListItemAvatar>
                    <Avatar
                      src={auth.photoURL}
                      alt="person"
                      style={{ marginLeft: -7, marginTop: 3 }}
                    />
                  </ListItemAvatar>
                )}

              {!drawer.open &&
                width !== 'sm' &&
                width !== 'xs' &&
                !auth.photoURL && (
                  <ListItemAvatar>
                    <Avatar style={{ marginLeft: -7, marginTop: 3 }}>
                      {' '}
                      <PersonIcon />{' '}
                    </Avatar>
                  </ListItemAvatar>
                )}

              <ListItemText
                classes={{
                  primary: classes.listItem,
                  secondary: classes.listItem,
                }}
                style={{
                  marginLeft:
                    !drawer.open &&
                    width !== 'sm' &&
                    width !== 'xs' &&
                    auth.photoURL
                      ? 7
                      : undefined,
                }}
                primary={auth.displayName}
                secondary={auth.email}
              />
              {drawer.open && (
                <ListItemSecondaryAction
                  onClick={() => {
                    setDialogIsOpen('auth_menu', !dialogs.auth_menu)
                  }}
                >
                  <IconButton>
                    {dialogs.auth_menu && (
                      <ArrowDropUpIcon classes={{ root: classes.icon }} />
                    )}
                    {!dialogs.auth_menu && (
                      <ArrowDropDownIcon classes={{ root: classes.icon }} />
                    )}
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          </List>
        </div>
      )}

      {!auth.isAuthorised && (
        <List>
          <ListItem>
            <ListItemText
              classes={{ primary: classes.listItem }}
              primary={intl.formatMessage({ id: 'app_name' })}
            />
            <Hidden smDown implementation="css">
              <ListItemSecondaryAction>
                <IconButton
                  className={classes.button}
                  onClick={() => {
                    setDrawerUseMinified(false)
                  }}
                >
                  {theme.direction === 'rtl' && (
                    <ChevronRight classes={{ root: classes.icon }} />
                  )}
                  {theme.direction !== 'rtl' && (
                    <ChevronLeft classes={{ root: classes.icon }} />
                  )}
                </IconButton>
              </ListItemSecondaryAction>
            </Hidden>
          </ListItem>
        </List>
      )}
    </Paper>
  )
}

export default compose(
  injectIntl,
  withAppConfigs,
  withWidth(),
  withStyles(styles, { withTheme: true })
)(DrawerHeader)
