import React, { useContext } from 'react'
import Avatar from '@material-ui/core/Avatar'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import ChromeReaderMode from '@material-ui/icons/ChromeReaderMode'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import PersonIcon from '@material-ui/icons/Person'
import ConfigContext from 'base-shell/lib/providers/Config/Context'
import MenuContext from '../../providers/Menu/Context'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
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
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}))

const MenuHeader = () => {
  const theme = useTheme()
  const { appConfig } = useContext(ConfigContext)
  const authData = appConfig.auth.getData()
  const classes = useStyles()
  const {
    isDesktop,
    isDesktopOpen,
    setDesktopOpen,
    isMini,
    setMini,
  } = useContext(MenuContext)

  return (
    <Paper square={true} className={classes.paper}>
      {isMini && authData.isAuthorised && (
        <div className={classes.toolbar}></div>
      )}
      <List className={clsx(!authData.isAuthorised && classes.toolbar)}>
        <ListItem>
          {
            authData.isAuthorised && (
              <ListItemAvatar>
                {authData.photoURL && (
                  <Avatar src={authData.photoURL} alt="user" />
                )}
                {!authData.photoURL && (
                  <Avatar>
                    {authData.displayName ? authData.displayName[0].toUpperCase() : <PersonIcon />}
                  </Avatar>
                )}
              </ListItemAvatar>
            )
          }
          {isDesktop && !isMini && (
            <ListItemSecondaryAction>
              <IconButton
                onClick={() => {
                  setMini(true)
                  setDesktopOpen(false)
                }}
              >
                <ChromeReaderMode classes={{ root: classes.icon }} />
              </IconButton>
              <IconButton
                color="inherit"
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
          )}
        </ListItem>
        {authData.isAuthorised && (
          <ListItem
          // onClick={() => {
          //   setDialogIsOpen('auth_menu', !dialogs.auth_menu)
          // }}
          >
            {!isDesktopOpen && isDesktop && authData.photoURL && (
              <ListItemAvatar>
                <Avatar
                  src={authData.photoURL}
                  alt="person"
                  style={{ marginLeft: -7, marginTop: 3 }}
                />
              </ListItemAvatar>
            )}

            {!isMini && (
              <ListItemText
                classes={{
                  primary: classes.listItem,
                  secondary: classes.listItem,
                }}
                style={{
                  marginLeft:
                    !isDesktopOpen && isDesktop && authData.photoURL
                      ? 7
                      : undefined,
                }}
                primary={authData.displayName}
              // secondary={authData.email}
              />
            )}
            {isDesktopOpen && false && (
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
        )}
      </List>
    </Paper>
  )
}

export default MenuHeader
