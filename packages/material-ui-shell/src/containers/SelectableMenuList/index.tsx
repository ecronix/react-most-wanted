import React, { useState, useEffect, useCallback } from 'react'
import { useTheme as useAppTheme, useMenu } from '@ecronix/material-ui-shell'
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
import { MenuItemType } from '@ecronix/material-ui-shell/common.type'

type PropTypes = {
  onIndexChange: (
    e: React.FormEvent<HTMLUListElement | HTMLLIElement>,
    v: string
  ) => React.FormEventHandler<HTMLUListElement | HTMLLIElement>
  useMinified: boolean
  items: any[]
  index: number
}
type StateType = {
  previousItems?: MenuItemType[][]
  items?: MenuItemType[]
  previousTitles?: string[]
  title?: string
  index?: number | string
}

/**
 * @description Menu list container component takeing in account RTL properties from theme and
 * isMiniMode property from menu context
 * @param {PropTypes} props - properties passed in component
 * @param  props.onIndexChange - method triggered on index change on List component from @mui/material
 * @param {boolean} props.useMinfied - defines if minified menu should be displayed
 * @param  props.items - Menu items to be renderd
 * @param  props.index - optional parameter
 *
 * @example
 * <SelectableMenuListContainer
 *   key={isMiniSwitchVisibility + themeContext.isRTL}
 *   onIndexChange={handleChange}
 *   useMinified={isMiniMode}
 *   items={menuItems}
 *   index={index}
 * />
 * @returns
 *
 * @see {useMenu} - for referencing isMiniMode
 * @see {useAppTheme} - for referencing isRTL
 */
export function SelectableMenuListContainer({
  onIndexChange,
  useMinified,
  items,
  index,
}: PropTypes) {
  const [state, setState] = useState<StateType>({})
  const { isRTL } = useAppTheme()
  const { isMiniMode } = useMenu()
  const { pathname = '' } = useLocation()

  const loopItems = useCallback(
    (
      items: MenuItemType[],
      previousItems: MenuItemType[] = [],
      title: string
    ) => {
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
          loopItems(nestedItems, [...previousItems, ...items], primaryText)
        }
        //console.log('i', i)
        return i
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    []
  )

  const list: MenuItemType[] =
    state.previousItems && state.items && state.previousItems.length > 0
      ? state.items
      : items

  useEffect(() => {
    loopItems(items, [], '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //Clears nested state if the root items change
  //Used to open auth menu if we are in a nested menu
  //We use just the length because the auth menu has always less items
  useEffect(() => {
    //setState({})
  }, [items.length])

  const handleNestedItemsClick = (item: MenuItemType) => {
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

  const getItem = (item: MenuItemType, i: number) => {
    const { index } = state

    delete item.visible

    if (item !== undefined) {
      if (item.subheader !== undefined) {
        // Removed inset={item.inset} doesn't exist
        return (
          <div key={i} style={item.style}>
            {item.subheader}
          </div>
        )
      } else if (item.divider !== undefined) {
        return <Divider key={i} style={item.style} /> // Removed inset={item.inset} doesn't exist
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
                // selected={index && index === item.value}
                key={i}
                onClick={(e: React.FormEvent<HTMLLIElement>) => {
                  onIndexChange(e, item.value!)
                  handleNestedItemsClick(item)
                  if (item.onClick) {
                    item.onClick()
                  }
                }}
                onMouseDown={(
                  e: React.MouseEvent<HTMLLIElement, MouseEvent>
                ) => {
                  if (e.button === 1) {
                    var win = window.open(`${item.value}`, '_blank')
                    win?.focus()
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
    <List
      // value={index}
      onChange={(e: React.FormEvent<HTMLUListElement>) =>
        onIndexChange(e, index.toString())
      }
    >
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
