import AutoSizer from 'react-virtualized-auto-sizer'
import List from '@material-ui/core/List'
import React, { useEffect } from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar'
import { FixedSizeList } from 'react-window'
import { useFilter } from 'material-ui-shell/lib/providers/Filter'
import { useIntl } from 'react-intl'
import { useState } from 'react'

const CustomScrollbarsVirtualList = React.forwardRef((props, ref) => {
  const { style, ...rest } = props
  return (
    <Scrollbar
      {...rest}
      forwardedRef={ref}
      style={{ ...style, overflow: 'hidden' }}
    />
  )
})

export default function (props) {
  const {
    fields = [],
    list: source = [],
    getPageProps = () => {},
    listProps,
    Row,
    name,
    setListRef = () => {},
    initialIndex = 0,
    preserveScroll = true,
  } = props
  const intl = useIntl()
  const listRef = React.createRef()
  const [ref, setRef] = useState(false)
  const {
    openFilter,
    getList,
    getFilter,
    setSearch,
    setScrollOffset,
  } = useFilter()
  const { queries = [], search = {}, scrollOffset = 0 } = getFilter(name)
  const { value: searchvalue = '' } = search

  const list = getList(name, source, fields)

  useEffect(() => {
    if (preserveScroll && ref && scrollOffset) {
      listRef.current.scrollTo(scrollOffset)
    }
  }, [ref])

  useEffect(() => {
    return () => {
      try {
        if (preserveScroll && listRef.current) {
          const offset = listRef.current.state.scrollOffset
          setScrollOffset(name, offset)
        }
      } catch (error) {
        console.warn('Could not save scrollOffset', error)
      }
    }
  }, [])

  return (
    <AutoSizer style={{ height: '100%', width: '100%' }}>
      {({ height, width }) => {
        return (
          <List>
            <FixedSizeList
              ref={(r) => {
                if (r) {
                  listRef.current = r
                  setRef(true)
                }
              }}
              height={height}
              itemCount={list.length}
              width={width}
              outerElementType={CustomScrollbarsVirtualList}
              {...listProps}
            >
              {(p) => <Row {...p} data={list[p.index]} />}
            </FixedSizeList>
          </List>
        )
      }}
    </AutoSizer>
  )
}
