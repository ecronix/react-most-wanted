import React, { useContext } from 'react'
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
import ConfigContext from 'base-shell/lib/providers/Config/Context'
import { useIntl } from 'react-intl'
import MenuContext from '../../providers/Menu/Context'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import withWidth from '@material-ui/core/withWidth'
const useStyles = makeStyles((theme) => ({
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
}))

const MenuHeader = ({ width }) => {

  const intl = useIntl();
  const theme = useTheme();
  const { appConfig } = useContext(ConfigContext);
  const authData = appConfig.auth.getData();
  const classes = useStyles()
  const {
    isDesktopOpen,
    setDesktopOpen,
    isMini,
    setMini,
  } = useContext(MenuContext)

  return (
    <Paper square={true} className={classes.paper}>
      {authData.isAuthorised && (
        <div>
          <List>
            <ListItem>
              {authData.photoURL && (
                <ListItemAvatar>
                  <Avatar src={authData.photoURL} alt="user" />
                </ListItemAvatar>
              )}
              {!authData.photoURL && (
                // <ListItemAvatar>
                //   <Avatar>
                //     {' '}
                //     <PersonIcon />{' '}
                //   </Avatar>
                // </ListItemAvatar>
                <ListItemText
                  classes={{ primary: classes.listItem }}
                  primary={intl.formatMessage({ id: 'app_name' })}
                />
              )}
              <Hidden smDown implementation="css">
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => {
                      setMini(true);
                      setDesktopOpen(false);
                    }}
                  >
                    <ChromeReaderMode classes={{ root: classes.icon }} />
                  </IconButton>
                  <IconButton
                    className={classes.button}
                    onClick={() => {
                      setDesktopOpen(false);
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
            // onClick={() => {
            //   setDialogIsOpen('auth_menu', !dialogs.auth_menu)
            // }}
            >
              {!isDesktopOpen &&
                width !== 'sm' &&
                width !== 'xs' &&
                authData.photoURL && (
                  <ListItemAvatar>
                    <Avatar
                      src={authData.photoURL}
                      alt="person"
                      style={{ marginLeft: -7, marginTop: 3 }}
                    />
                  </ListItemAvatar>
                )}

              {!isDesktopOpen &&
                width !== 'sm' &&
                width !== 'xs' &&
                !authData.photoURL && (
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
                    !isDesktopOpen &&
                      width !== 'sm' &&
                      width !== 'xs' &&
                      authData.photoURL
                      ? 7
                      : undefined,
                }}
                primary={authData.displayName}
              // secondary={authData.email}
              />
              {isDesktopOpen && (
                <ListItemSecondaryAction
                // onClick={() => {
                //   setDialogIsOpen('auth_menu', !dialogs.auth_menu)
                // }}
                >
                  <IconButton>
                    {/* {dialogs.auth_menu && (
                      <ArroWDropUpIcon classes={{ root: classes.icon }} />
                    )}
                    {!dialogs.auth_menu && (
                      <ArroWDropDownIcon classes={{ root: classes.icon }} />
                    )} */}
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          </List>
        </div>
      )}

      {!authData.isAuthorised && (
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
                    setDesktopOpen(false)
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

export default withWidth()(MenuHeader);
