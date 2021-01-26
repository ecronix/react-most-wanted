import React from 'react'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useMenu } from 'material-ui-shell/lib/providers/Menu'
import { useTheme as useAppTheme } from 'material-ui-shell/lib/providers/Theme'
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
  ChevronLeft as ChevronLeft,
  ChevronRight as ChevronRight,
  ChromeReaderMode as ChromeReaderMode,
  Person as PersonIcon,
  ArrowDropDown as ArrowDropDownIcon,
  ArrowDropUp as ArrowDropUpIcon,
  Brightness4 as Brightness4Icon,
  BrightnessHigh as BrightnessHighIcon,
} from '@material-ui/icons'


import FormatTextdirectionRToLIcon from '@material-ui/icons/FormatTextdirectionRToL'
import FormatTextdirectionLToRIcon from '@material-ui/icons/FormatTextdirectionLToR';


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
  const { type, setType, direction, setDirection } = useAppTheme()
  const authData = auth
  const classes = useStyles()
  const {
    isDesktop,
    setMenuOpen,
    setMiniMode,
    isMiniMode,
    isMenuOpen,
    isMiniSwitchVisibility,
    isAuthMenuOpen,
    setAuthMenuOpen,
  } = useMenu()

  const isAuthenticated = auth.isAuthenticated
  const AvatarConstructor = ({src, alt, avatar}) => {
    return (
    <ListItemAvatar
      onClick={() => setAuthMenuOpen(!isAuthMenuOpen)}>
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
                    setType(type === 'light' ? 'dark' : 'light')
                  }}
                >
                  {type === 'light' && (
                    <Brightness4Icon classes={{ root: classes.icon }} />)}
                  {type === 'dark' && (
                    <BrightnessHighIcon classes={{ root: classes.icon }} />)}
                </IconButton>
                {isDesktop && (
                  <>
                    {isMiniSwitchVisibility && (
                      <IconButton
                        onClick={() => {
                          setMiniMode(true)
                          setMenuOpen(false)
                        }}
                      >
                        <ChromeReaderMode classes={{ root: classes.icon }} />
                      </IconButton>
                    )}
                    <IconButton
                      onClick={() => {
                        setDirection(direction === 'ltr' ? 'rtl' : 'ltr')
                      }}>
                      {direction === 'ltr' && <FormatTextdirectionLToRIcon />}
                      {direction === 'rtl' && <FormatTextdirectionRToLIcon />}
                    </IconButton>
                    <IconButton
                      color="inherit"
                      onClick={() => {
                        setMenuOpen(false)
                      }}
                    >
                      {theme.direction === 'rtl' && (
                        <ChevronRight classes={{ root: classes.icon }} />)}
                      {theme.direction !== 'rtl' && (
                        <ChevronLeft classes={{ root: classes.icon }} />)}
                    </IconButton>{' '}
                  </>
                )}
              </ListItemSecondaryAction>
          </ListItem>
        )}

        {isAuthenticated && (
          <ListItem
            onClick={() => {
              setAuthMenuOpen(!isAuthMenuOpen)
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
                  setAuthMenuOpen(!isAuthMenuOpen)
                }}
              >
                <IconButton> {
                  isAuthMenuOpen
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

/* 
                <IconButton
                  onClick={() => {
                    setDirection(direction === 'ltr' ? 'rtl' : 'ltr')
                  }}>
                  {direction === 'ltr' && <FormatTextdirectionLToRIcon />}
                  {direction === 'rtl' && <FormatTextdirectionRToLIcon />}
                </IconButton>
*/