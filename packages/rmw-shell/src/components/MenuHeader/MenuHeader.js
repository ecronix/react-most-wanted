import React/* , { useContext }  */from 'react'
// import { useConfig } from 'base-shell/lib/providers/Config'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useMenu } from 'material-ui-shell/lib/providers/Menu'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'

import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper
} from '@material-ui/core'
import {
  ArrowDropDown as ArrowDropDownIcon,
  ArrowDropUp as ArrowDropUpIcon,
  Brightness4 as Brightness4Icon,
  BrightnessHigh as BrightnessHighIcon,
  ChevronLeft,
  ChevronRight,
  ChromeReaderMode,
  Person as PersonIcon
} from '@material-ui/icons'


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
  const classes = useStyles()
  const authData = auth
  const menuContext = useMenu()
  const { auth } = useAuth()
  const {
    toggleThis,
    isDesktop,
    isMiniMode,
    isMenuOpen,
    isMiniSwitchVisibility,
    isAuthMenuOpen,
  } = menuContext || {}
  const isAuthenticated = auth.isAuthenticated

  return (
    <Paper square={true} className={classes.paper}>
      {isMiniMode && isAuthenticated && <div className={classes.toolbar}></div>}
      <List className={clsx(!isAuthenticated && classes.toolbar)}>
        {!isMiniMode && (
          <ListItem className={classes.listItem}>
            {isAuthenticated && !isMiniMode &&/*james- !isMiniMode may not be needed */ (
              <React.Fragment>
                {authData.photoURL && (
                  <ListItemAvatar
                    onClick={() => {
                      toggleThis('isAuthMenuOpen')
                    }}
                  >
                    {console.log('test2')}
                    <Avatar src={authData.photoURL} alt="user" />
                  </ListItemAvatar>
                )}
                {!authData.photoURL && (
                  <ListItemAvatar
                    onClick={() => {
                      toggleThis('isAuthMenuOpen')
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
            {!isMiniMode && (/* james - this may be redundant, compare with MUI Menuheader */
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => {
                    toggleThisTheme('isDarkMode')
                  }}
                >
                  {isDarkMode
                    ? <BrightnessHighIcon classes={{ root: classes.icon }} />
                    : <Brightness4Icon classes={{ root: classes.icon }} />}
                </IconButton>
                {isMenuOpen /* james-pretty sure this isn't needed */&& (
                  <>
                    {isMiniSwitchVisibility && (
                      <IconButton
                        onClick={() => {
                          toggleThis('isMiniMode', true)
                          toggleThis('isMenuOpen', false)
                        }}
                      >
                        <ChromeReaderMode classes={{ root: classes.icon }} />
                      </IconButton>
                    )}
                    <IconButton
                      color="inherit"
                      onClick={() => {
                        toggleThis('isMenuOpen', false)
                      }}
                    >
                      {isRTL
                        ? <ChevronRight classes={{ root: classes.icon }} />
                        : <ChevronLeft classes={{ root: classes.icon }} />}
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
              toggleThis('isAuthMenuOpen')
            }}
          >
            {!isMenuOpen && isMiniMode && isDesktop && (
              <ListItemAvatar>
                <Avatar
                  src={authData.photoURL}
                  alt="person"
                />
              </ListItemAvatar>
            )}
            {!isMiniMode && (
              <ListItemText
                classes={{
                  primary: classes.listItem,
                  secondary: classes.listItem,
                }}
                style={{
                  marginLeft:
                    !isMenuOpen && isDesktop && authData.photoURL
                      ? 7
                      : undefined,
                }}
                primary={authData.displayName}
                secondary={authData.email}
              />
            )}
            {isMenuOpen && (
              <ListItemSecondaryAction
                onClick={() => {
                  toggleThis('isAuthMenuOpen')
                }}
              >
                <IconButton>
                  {isAuthMenuOpen
                    ? <ArrowDropUpIcon classes={{ root: classes.icon }} />
                    : <ArrowDropDownIcon classes={{ root: classes.icon }} />}
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
