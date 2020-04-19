import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import { compose } from 'redux'
import { connect } from 'react-redux'
import drawerActions from '../../store/drawer/actions'
import { withRouter } from 'react-router-dom'
import { default as withAppConfigs } from 'base-shell/lib/providers/ConfigProvider/withConfig'
import { injectIntl } from 'react-intl'


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

const Menu = ({ drawer, setDrawerOpen, setDrawerMobileOpen, appConfig, intl, match, history }) => {
  const classes = useStyles()
  const theme = useTheme()
  const { open = false } = drawer

  const menuItems = appConfig
    .getMenuItems({
      intl,
      auth: appConfig.auth,
      //locale,
      //updateLocale,
    })
    .filter((item) => {
      return item.visible !== false
    })
 
  const handleDrawerOpen = () => {
    setDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  const index = match ? match.path : '/'

  const onIndexChange = (event, index) => {
   
    if (index !== undefined) {
      setDrawerMobileOpen(false)
    }

    if (index !== undefined && index !== Object(index)) {
      history.push(index)
    }
  }

  const useMinified = drawer.useMinified && !drawer.open
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
            onClick={e => {
              onIndexChange(e, item.value)
              // this.handleNestedItemsClick(item)
              if (item.onClick) {
                item.onClick()
              }
            }}
            onMouseDown={e => {
              if (e.button === 1) {
                var win = window.open(`${item.value}`, '_blank')
                win.focus()
              }
            }}
          >
            {item.leftIcon && <ListItemIcon>{item.leftIcon}</ListItemIcon>}

            {!useMinified && <ListItemText primary={item.primaryText} />}

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
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
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
          .filter(item => {
            return item.visible !== false
          })
          .map((item, i) => {
            return getItem(item, i)
          })}
      </List>
    </Drawer>
  )
}

const mapStateToProps = (state) => {
  const { drawer } = state
  return { drawer }
}

export default compose(connect(mapStateToProps, { ...drawerActions }), injectIntl, withRouter, withAppConfigs)(Menu)
