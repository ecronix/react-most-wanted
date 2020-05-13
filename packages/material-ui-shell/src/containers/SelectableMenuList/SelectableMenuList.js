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
import React, { Component, useState } from 'react'

const SelectableMenuList = ({ onIndexChange, useMinified, items, index }) => {
  const [state, setState] = useState({})

  const handleNestedItemsClick = (item) => {
    if (item.nestedItems) {
      let previousItems = state.previousItems || []
      let previousTitles = state.previousTitles || []
      const items = item.nestedItems
      const title = item.primaryText

      previousItems.unshift(state.items || items)
      previousTitles.unshift(state.title || title)

      setState({
        ...state,
        items,
        previousItems,
        previousTitles,
        title,
        index: item.value,
      })
    } else {
      if (item.value || item.onClick) {
        setState({ ...state, index: item.value })
      }
    }
  }

  const handleBackClick = () => {
    let previousItems = state.previousItems || []
    let previousTitles = state.previousTitles || []
    const items = previousItems[0] || undefined
    const title = previousTitles[0] || undefined

    previousItems.shift()
    previousTitles.shift()

    setState({ ...state, items, previousItems, previousTitles, title })
  }

  const getNestedItems = (hostItem, hostIndex) => {
    if (hostItem.nestedItems !== undefined) {
      let items = hostItem.nestedItems.filter(function (item) {
        return item.visible !== false
      })

      if (items.length > 0) {
        return items.map((item, i) => {
          return getItem(item, hostIndex.toString() + i.toString())
        })
      }
    }

    return null
  }

  const getItem = (item, i) => {
    const { index } = state

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
            onClick={(e) => {
              onIndexChange(e, item.value)
              handleNestedItemsClick(item)

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

            {!useMinified && <ListItemText primary={item.primaryText} />}

            {item.nestedItems && !useMinified && (
              <ListItemSecondaryAction
                onClick={() => {
                  handleNestedItemsClick(item)
                }}
              >
                <IconButton
                  style={{ marginRight: useMinified ? 150 : undefined }}
                >
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

  const list =
    state.previousItems && state.previousItems.length > 0 ? state.items : items

  return (
    <List value={index} onChange={onIndexChange}>
      {state.items && state.previousItems && state.previousItems.length > 0 && (
        <div>
          <ListItem
            button
            onClick={() => {
              handleBackClick()
            }}
          >
            <ListItemIcon>
              <ArrowBack />
            </ListItemIcon>
            <ListItemText primary={state.title} />
          </ListItem>
          <Divider />
        </div>
      )}
      {list
        .filter((item) => {
          return item.visible !== false
        })
        .map((item, i) => {
          return getItem(item, i)
        })}
    </List>
  )
}

SelectableMenuList.propTypes = {
  items: PropTypes.array.isRequired,
  onIndexChange: PropTypes.func.isRequired,
  index: PropTypes.string.isRequired,
}

export default SelectableMenuList
