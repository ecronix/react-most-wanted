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
import {useAuth} from 'base-shell/lib/providers/Auth'
import {useMenu} from 'material-ui-shell/lib/providers/Menu'
import { useTheme as useThemeProvider } from 'material-ui-shell/lib/providers/Theme'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import ArroWDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArroWDropUpIcon from '@material-ui/icons/ArrowDropUp'
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
  const { type, setType } = useThemeProvider()
  const classes = useStyles()
  const {
    isDesktop,
    isDesktopOpen,
    setDesktopOpen,
    isMini,
    setMini,
    isAuthMenuOpen,
    setAuthMenuOpen,
    useMiniMode,
  } = useMenu()

  const isAuthenticated =auth.isAuthenticated 

  return (
    <Paper square={true} className={classes.paper}>
      {isMini && isAuthenticated && <div className={classes.toolbar}></div>}
      <List className={clsx(!isAuthenticated && classes.toolbar)}>
        {!isMini && (
          <ListItem className={classes.listItem}>
            {isAuthenticated && !isMini && (
              <React.Fragment>
                {auth.photoURL && (
                  <ListItemAvatar
                    onClick={() => {
                      setAuthMenuOpen(!isAuthMenuOpen)
                    }}
                  >
                    <Avatar src={auth.photoURL} alt="user" />
                  </ListItemAvatar>
                )}
                {!auth.photoURL && (
                  <ListItemAvatar
                    onClick={() => {
                      setAuthMenuOpen(!isAuthMenuOpen)
                    }}
                  >
                    <Avatar>
                      {auth.displayName ? (
                        auth.displayName[0].toUpperCase()
                      ) : (
                        <PersonIcon />
                      )}
                    </Avatar>
                  </ListItemAvatar>
                )}
              </React.Fragment>
            )}
            {!isMini && (
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
                    {useMiniMode && (
                      <IconButton
                        onClick={() => {
                          setMini(true)
                          setDesktopOpen(false)
                        }}
                      >
                        <ChromeReaderMode classes={{ root: classes.icon }} />
                      </IconButton>
                    )}
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
            {!isDesktopOpen && isDesktop && (
              <ListItemAvatar>
                <Avatar
                  src={auth.photoURL}
                  alt="person"
                  //style={{ marginLeft: 0, marginTop: 0 }}
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
                    !isDesktopOpen && isDesktop && auth.photoURL
                      ? 7
                      : undefined,
                }}
                primary={auth.displayName}
                secondary={auth.email}
              />
            )}
            {isDesktopOpen && (
              <ListItemSecondaryAction
                onClick={() => {
                  setAuthMenuOpen(!isAuthMenuOpen)
                }}
              >
                <IconButton>
                  {isAuthMenuOpen && (
                    <ArroWDropUpIcon classes={{ root: classes.icon }} />
                  )}
                  {!isAuthMenuOpen && (
                    <ArroWDropDownIcon classes={{ root: classes.icon }} />
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
