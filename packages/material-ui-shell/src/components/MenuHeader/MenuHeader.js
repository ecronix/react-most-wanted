import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useMenu } from 'material-ui-shell/lib/providers/Menu'
import { useTheme as useAppTheme } from 'material-ui-shell/lib/providers/Theme'
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
  ChevronLeft as ChevronLeft,
  ChevronRight as ChevronRight,
  ChromeReaderMode as ChromeReaderMode,
  Person as PersonIcon,
  ArrowDropDown as ArrowDropDownIcon,
  ArrowDropUp as ArrowDropUpIcon,
  Brightness4 as Brightness4Icon,
  BrightnessHigh as BrightnessHighIcon,
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

  const { auth } = useAuth()
  const { toggleThisTheme, isDarkMode, isRTL } = useAppTheme()
  const authData = auth
  const classes = useStyles()
  const {
    toggleThis,
    isDesktop,
    isMiniMode,
    isMenuOpen,
    isMiniSwitchVisibility,
    isAuthMenuOpen,
  } = useMenu()

  const isAuthenticated = auth.isAuthenticated
  const AvatarConstructor = ({src, alt, avatar}) => {
    return (
    <ListItemAvatar
      onClick={() => toggleThis('isAuthMenuOpen')}>
      <Avatar src={src} alt={alt}> {avatar} </Avatar>
    </ListItemAvatar>
    )
  }

  return (
    <Paper square={true} className={classes.paper}>
      {isMiniMode && isAuthenticated && <div className={classes.toolbar}></div>}
      <List className={clsx(!isAuthenticated && classes.toolbar)}>
        {!isMiniMode && (
          <ListItem className={classes.listItem}>
            {isAuthenticated && (
              authData.photoURL
                ? AvatarConstructor({
                  src: authData.photoURL,
                  alt:"user"})
                : AvatarConstructor({
                  avatar: authData.displayName
                    ? authData.displayName[0].toUpperCase()
                    : <PersonIcon />}))}
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
                {isDesktop && (
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
          </ListItem>
        )}

        {isAuthenticated && (
          <ListItem
            onClick={() => {
              toggleThis('isAuthMenuOpen')
            }}
          >
          {!isMenuOpen && isMiniMode && isDesktop && (
            authData.photoURL
            ? AvatarConstructor({
              src: authData.photoURL,
              alt:"user"})
            : AvatarConstructor({
              avatar: authData.displayName
                ? authData.displayName[0].toUpperCase()
                : <PersonIcon />}))}
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
                      : undefined}}
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