import React from 'react'
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
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useMenu } from 'material-ui-shell/lib/providers/Menu'
import { useTheme as useAppTheme } from 'material-ui-shell/lib/providers/Theme'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh'

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.primary.dark,
    margin: 0,
    padding: 0,
  },
  listItem: {
    color: theme.palette.primary.contrastText,
    cursor: 'pointer',
  },
  icon: {
    color: theme.palette.primary.contrastText,
    cursor: 'pointer',
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
  const { auth } = useAuth()
  const { type, setType } = useAppTheme()
  const authData = auth
  const classes = useStyles()
  const {
    isDesktop,
    // isDesktopOpen,
    dispatch,
    menuStore,
    setMenuOpen,
    setMiniMode,
    // setDesktopOpen,
    // isMini,
    // setMini,
    isAuthMenuOpen,
    setAuthMenuOpen,
    // useMiniMode,
  } = useMenu()

  const isAuthenticated = auth.isAuthenticated

  return (
    <Paper square={true} className={classes.paper}>
      {menuStore.miniMode && isAuthenticated && <div className={classes.toolbar}></div>}
      <List className={clsx(!isAuthenticated && classes.toolbar)}>
        {!menuStore.miniMode && (
          <ListItem className={classes.listItem}>
            {isAuthenticated && !menuStore.miniMode && (
              <React.Fragment>
                {authData.photoURL && (
                  <ListItemAvatar
                    onClick={() => {
                      setAuthMenuOpen(!isAuthMenuOpen)
                    }}
                  >
                    <Avatar src={authData.photoURL} alt="user" />
                  </ListItemAvatar>
                )}
                {!authData.photoURL && (
                  <ListItemAvatar
                    onClick={() => {
                      setAuthMenuOpen(!isAuthMenuOpen)
                    }}
                  >
                    <Avatar>
                      {authData.displayName ? (
                        authData.displayName[0].toUpperCase()
                      ) : (
                        <PersonIcon />
                      )}
                    </Avatar>
                  </ListItemAvatar>
                )}
              </React.Fragment>
            )}
            {!menuStore.miniMode && (
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => {
                    setType(type === 'light' ? 'dark' : 'light')
                  }}
                >
                  {type === 'light' && (
                    <Brightness4Icon classes={{ root: classes.icon }} />
                  )}
                  {type === 'dark' && (
                    <BrightnessHighIcon classes={{ root: classes.icon }} />
                  )}
                </IconButton>
                {isDesktop && (
                  <>
                    {menuStore.miniSwitchVisibility && (
                      <IconButton
                        onClick={() => {
                          setMiniMode(dispatch, true)
                          setMenuOpen(dispatch, false)
                        }}
                      >
                        <ChromeReaderMode classes={{ root: classes.icon }} />
                      </IconButton>
                    )}
                    <IconButton
                      color="inherit"
                      onClick={() => {
                        setMenuOpen(dispatch, false)
                      }}
                    >
                      {theme.direction === 'rtl' && (
                        <ChevronRight classes={{ root: classes.icon }} />
                      )}
                      {theme.direction !== 'rtl' && (
                        <ChevronLeft classes={{ root: classes.icon }} />
                      )}
                    </IconButton>{' '}
                  </>
                )}
              </ListItemSecondaryAction>
            )}
          </ListItem>
        )}

        {isAuthenticated && (
          <ListItem
            onClick={() => {
              setAuthMenuOpen(!isAuthMenuOpen)
            }}
          >
            {!menuStore.menuOpen && isDesktop && authData.photoURL && (
              <ListItemAvatar>
                <Avatar
                  src={authData.photoURL}
                  alt="person"
                  //style={{ marginLeft: 0, marginTop: 0 }}
                />
              </ListItemAvatar>
            )}

            {!menuStore.miniMode && (
              <ListItemText
                classes={{
                  primary: classes.listItem,
                  secondary: classes.listItem,
                }}
                style={{
                  marginLeft:
                    !menuStore.menuOpen && isDesktop && authData.photoURL
                      ? 7
                      : undefined,
                }}
                primary={authData.displayName}
                secondary={authData.email}
              />
            )}
            {menuStore.menuOpen && (
              <ListItemSecondaryAction
                onClick={() => {
                  setAuthMenuOpen(!isAuthMenuOpen)
                }}
              >
                <IconButton>
                  {isAuthMenuOpen && (
                    <ArrowDropUpIcon classes={{ root: classes.icon }} />
                  )}
                  {!isAuthMenuOpen && (
                    <ArrowDropDownIcon classes={{ root: classes.icon }} />
                  )}
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
