import React, { useContext } from 'react'
import { useConfig } from 'base-shell/lib/providers/Config'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useMenu } from 'material-ui-shell/lib/providers/Menu'
import { useTheme as useAppTheme } from 'material-ui-shell/lib/providers/Theme'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'

/* import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import ChromeReaderMode from '@material-ui/icons/ChromeReaderMode'
import PersonIcon from '@material-ui/icons/Person'
 */
/* 
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper' */
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
  const theme = useTheme()
  const { auth } = useAuth()
  const { appConfig } = useConfig()
  const { type, setType } = useAppTheme()
  const { menu } = appConfig || {}
  const authData = auth
  const classes = useStyles()
  const {
    toggleThis,
    isDesktop,
    isMiniMode,
    isMenuOpen,
    isMiniSwitchVisibility,
    isAuthMenuOpen,
    isAuthMenuOpen,
    // setAuthMenuOpen,
  } = useMenu()
  // } = useContext(MenuContext)

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
                      // setAuthMenuOpen(!isAuthMenuOpen)
                    }}
                  >
                    <Avatar src={authData.photoURL} alt="user" />
                  </ListItemAvatar>
                )}
                {!authData.photoURL && (
                  <ListItemAvatar
                    onClick={() => {
                      // setAuthMenuOpen(!isAuthMenuOpen)
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
                    // setType(type === 'light' ? 'dark' : 'light')
                    toggleThisTheme('isDarkMode')
                  }}
                >
{/*                   {type === 'light' && (
                    <Brightness4Icon classes={{ root: classes.icon }} />
                  )}
                  {type === 'dark' && (
                    <BrightnessHighIcon classes={{ root: classes.icon }} />
                  )} */}
                  {isDarkMode
                    ? <BrightnessHighIcon classes={{ root: classes.icon }} />
                    : <Brightness4Icon classes={{ root: classes.icon }} />}
                </IconButton>
                {/* menuStore.menuOpen *//* isDesktop */isMenuOpen /*james- check which works better */ && (
                  <>
                    {isMiniSwitchVisibility && (
                      <IconButton
                        onClick={() => {
                          // setMiniMode(dispatch, true)
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
                        // setMenuOpen(dispatch,true)
                        toggleThis('isMenuOpen', false)
                      }}
                    >
{/*                       {theme.direction === 'rtl' && (
                        <ChevronRight classes={{ root: classes.icon }} />
                      )}
                      {theme.direction !== 'rtl' && (
                        <ChevronLeft classes={{ root: classes.icon }} />
                      )} */}
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
              // setAuthMenuOpen(!isAuthMenuOpen)
              toggleThis('isAuthMenuOpen')
            }}
          >
            {/* {!menuStore.menuOpen && isDesktop && authData.photoURL && ( */}
            {!isMenuOpen && isMiniMode && isDesktop && (
              <ListItemAvatar>
                <Avatar
                  src={authData.photoURL}
                  alt="person"
                  //style={{ marginLeft: 0, marginTop: 0 }}
                />
              </ListItemAvatar>
            )}

            {/* !menuStore.miniMode */!isMiniMode && (
              <ListItemText
                classes={{
                  primary: classes.listItem,
                  secondary: classes.listItem,
                }}
                style={{
                  marginLeft:
                    !isMenuOpen /* menuStore.menuOpen */ && isDesktop && authData.photoURL
                      ? 7
                      : undefined,
                }}
                primary={authData.displayName}
                secondary={authData.email}
              />
            )}
            {/* menuStore.menuOpen */isMenuOpen && (
              <ListItemSecondaryAction
                onClick={() => {
                  // setAuthMenuOpen(!isAuthMenuOpen)
                  toggleThis('isAuthMenuOpen')
                }}
              >
                <IconButton>
{/*                   {isAuthMenuOpen && (
                    <ArrowDropUpIcon classes={{ root: classes.icon }} />
                  )}
                  {!isAuthMenuOpen && (
                    <ArrowDropDownIcon classes={{ root: classes.icon }} />
                  )} */}
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
