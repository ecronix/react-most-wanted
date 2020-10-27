import ArrowBack from '@material-ui/icons/ArrowBack'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { withTheme, withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  icon: {
    color: theme.palette.primary.contrastText
  }
})

class SelectableMenuList extends Component {
  state = {}

  handleNestedItemsClick = item => {
    if (item.nestedItems) {
      let previousItems = this.state.previousItems ? this.state.previousItems : []
      const items = item.nestedItems
      const title = item.primaryText

      previousItems.unshift(this.state.items ? this.state.items : items)

      this.setState({ items, previousItems, title, index: item.value })
    } else {
      if (item.value || item.onClick) {
        this.setState({ index: item.value })
      }
    }
  }

  handleBackClick = () => {
    let previousItems = this.state.previousItems ? this.state.previousItems : []
    const items = previousItems[0] ? previousItems[0] : undefined

    previousItems.shift()

    this.setState({ items, previousItems })
  }

  getNestedItems = (hostItem, hostIndex) => {
    if (hostItem.nestedItems !== undefined) {
      let items = hostItem.nestedItems.filter(function(item) {
        return item.visible !== false
      })

      if (items.length > 0) {
        return items.map((item, i) => {
          return this.getItem(item, hostIndex.toString() + i.toString())
        })
      }
    }

    return null
  }

  getItem = (item, i) => {
    const { onIndexChange, useMinified } = this.props
    const { index } = this.state

    delete item.visible

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
              this.handleNestedItemsClick(item)

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

            {item.nestedItems && !useMinified && (
              <ListItemSecondaryAction
                onClick={() => {
                  this.handleNestedItemsClick(item)
                }}
              >
                <IconButton style={{ marginRight: useMinified ? 150 : undefined }}>
                  <KeyboardArrowRight color={'action'} />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        )
      }
    }

    return null
  }

  render() {
    const { items, onIndexChange, index } = this.props

    const list = this.state.previousItems && this.state.previousItems.length > 0 ? this.state.items : items

    return (
      <List value={index} onChange={onIndexChange}>
        {this.state.items && this.state.previousItems && this.state.previousItems.length > 0 && (
          <div>
            <ListItem
              button
              onClick={() => {
                this.handleBackClick()
              }}
            >
              <ListItemIcon>
                <ArrowBack />
              </ListItemIcon>
              <ListItemText primary={this.state.title} />
            </ListItem>
            <Divider />
          </div>
        )}
        {list
          .filter(item => {
            return item.visible !== false
          })
          .map((item, i) => {
            return this.getItem(item, i)
          })}
      </List>
    )
  }
}

SelectableMenuList.propTypes = {
  items: PropTypes.array.isRequired,
  onIndexChange: PropTypes.func.isRequired,
  index: PropTypes.string.isRequired
}

export default withTheme(withStyles(styles, { withTheme: true })(SelectableMenuList))
