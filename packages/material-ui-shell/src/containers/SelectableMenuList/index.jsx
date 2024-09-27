import React, { useState, useEffect, useCallback } from 'react'
import { useTheme as useAppTheme } from '../../providers/Theme'
import { useMenu } from '../../providers/Menu'
import {
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight,
  ArrowBack,
} from '@mui/icons-material'
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material'
import { useLocation } from 'react-router-dom'

export default function SelectableMenuList({
  onIndexChange,
  useMinified,
  items,
  index,
}) {
  const [state, setState] = useState({})
  const { isRTL } = useAppTheme()
  const { isMiniMode } = useMenu()
  const { pathname = '' } = useLocation()

  const loopItems = useCallback((items, previousItems = [], title) => {
    items.map((i) => {
      const { value = 'none', nestedItems = [], primaryText = '' } = i
      if (pathname === value) {
        if (previousItems.length) {
          setState({
            index: value,
            previousItems: [previousItems],
            items,
            title,
          })
        } else {
          setState({
            index: value,
          })
        }

        return i
      }

      if (nestedItems.length) {
        loopItems(nestedItems, [...previousItems, items], primaryText)
      }
      //console.log('i', i)
      return i
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const list =
    state.previousItems && state.previousItems.length > 0 ? state.items : items

  useEffect(() => {
    loopItems(items)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //Clears nested state if the root items change
  //Used to open auth menu if we are in a nested menu
  //We use just the length because the auth menu has always less items
  useEffect(() => {
    //setState({})
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
          <Tooltip
            disableFocusListener
            disableTouchListener
            disableHoverListener={!isMiniMode}
            aria-label={item.primaryText}
            placement={isRTL ? 'left' : 'right'}
            title={<Typography variant="button" children={item.primaryText} />}
            key={i}
          >
            <List>
              <ListItem
                disablePadding
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
                <ListItemButton>
                  {item.leftIcon && (
                    <ListItemIcon>{item.leftIcon}</ListItemIcon>
                  )}
                  {!useMinified && <ListItemText primary={item.primaryText} />}
                </ListItemButton>

                {item.nestedItems && !useMinified && (
                  <ListItemSecondaryAction
                    onClick={() => {
                      handleNestedItemsClick(item)
                    }}
                  >
                    <IconButton>
                      {isRTL ? (
                        <KeyboardArrowLeftIcon />
                      ) : (
                        <KeyboardArrowRight
                          sx={{
                            color: (t) => t.palette.text.primary,
                          }}
                        />
                      )}
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            </List>
          </Tooltip>
        )
      }
    }
    return null
  }

  return (
    <List value={index} onChange={onIndexChange}>
      {state.items && state.previousItems && state.previousItems.length > 0 && (
        <div>
          <ListItem
            disablePadding
            onClick={() => {
              handleBackClick()
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <ArrowBack />
              </ListItemIcon>
              <ListItemText primary={state.title} />
            </ListItemButton>
          </ListItem>
          <Divider />
        </div>
      )}
      {list.length &&
        list
          .filter((item) => {
            return item.visible !== false
          })
          .map((item, i) => {
            return getItem(item, i)
          })}
    </List>
  )
}
