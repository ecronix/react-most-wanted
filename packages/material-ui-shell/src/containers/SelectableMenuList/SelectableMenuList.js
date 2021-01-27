import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { useTheme as useAppTheme } from 'material-ui-shell/lib/providers/Theme'
import {
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRight,
  ArrowBack,
} from '@material-ui/icons'
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core'


const SelectableMenuList = ({ onIndexChange, useMinified, items, index }) => {
  const [state, setState] = useState({})

  //Clears nested state if the root items change
  //Used to open auth menu if we are in a nested menu
  //We use just the length because the auth menu has always less items
  useEffect(() => {
    setState({})
  }, [items.length])

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

  const getItem = (item, i) => {
    const { isRTL } = useAppTheme()
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
                  {isRTL
                  ? <KeyboardArrowLeftIcon />
                  : <KeyboardArrowRight color={'action'} />}
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
