import React, { useContext } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { useHistory, useRouteMatch } from 'react-router-dom'
import ConfigContext from 'base-shell/lib/providers/Config/Context'
import MenuContext from '../../providers/Menu/Context'
import { useIntl } from 'react-intl'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}))

const Menu = () => {
  const intl = useIntl()
  const history = useHistory()
  const match = useRouteMatch()
  const classes = useStyles()
  const theme = useTheme()
  const isDesktop = useMediaQuery('(min-width:600px)')

  const {
    isDesktopOpen,
    isMobileOpen,
    isMini,
    setDesktopOpen,
    setMobileOpen,
  } = useContext(MenuContext)

  const { appConfig } = useContext(ConfigContext)

  const menuItems = appConfig
    .getMenuItems({
      intl,
      auth: appConfig.auth,
    })
    .filter((item) => {
      return item.visible !== false
    })

  const handleDrawerClose = () => {
    if (isDesktop) {
      setDesktopOpen(false)
    } else {
      setMobileOpen(false)
    }
  }

  const index = match ? match.path : '/'

  const onIndexChange = (event, index) => {
    if (index !== undefined) {
      setMobileOpen(false)
    }

    if (index !== undefined && index !== Object(index)) {
      history.push(index)
    }
  }

  const getItem = (item, i) => {
    //delete item.visible
    if (item !== undefined) {
      if (item.subheader !== undefined) {
        return (
          <div key={i} inset={item.inset} style={item.style}>
            {item.subheader}
          </div>
        )
      } else if (item.divider !== undefined) {
        return <Divider key={i} inset={item.inset} style={item.style} />
      } else {
        return (
          <ListItem
            button
            selected={index && index === item.value}
            key={i}
            onClick={(e) => {
              onIndexChange(e, item.value)
              // this.handleNestedItemsClick(item)
              if (item.onClick) {
                item.onClick()
              }
            }}
            onMouseDown={(e) => {
              if (e.button === 1) {
                var win = window.open(`${item.value}`, '_blank')
                win.focus()
              }
            }}
          >
            {item.leftIcon && <ListItemIcon>{item.leftIcon}</ListItemIcon>}

            {!isMini && <ListItemText primary={item.primaryText} />}

            {/* {item.nestedItems && !useMinified && (
              <ListItemSecondaryAction
                onClick={() => {
                  this.handleNestedItemsClick(item)
                }}
              >
                <IconButton style={{ marginRight: useMinified ? 150 : undefined }}>
                  <KeyboardArrowRight color={'action'} />
                </IconButton>
              </ListItemSecondaryAction>
            )} */}
          </ListItem>
        )
      }
    }

    return null
  }

  return (
    <SwipeableDrawer
      className={classes.drawer}
      variant={isDesktop ? 'persistent' : 'temporary'}
      anchor="left"
      open={isDesktop ? isDesktopOpen : isMobileOpen}
      onClose={() => {
        setMobileOpen(false)
      }}
      onOpen={() => {
        setMobileOpen(true)
      }}
      classes={{
        paper: classes.drawerPaper,
      }}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List value={index} onChange={onIndexChange}>
        {menuItems
          .filter((item) => {
            return item.visible !== false
          })
          .map((item, i) => {
            return getItem(item, i)
          })}
      </List>
    </SwipeableDrawer>
  )
}

export default Menu
