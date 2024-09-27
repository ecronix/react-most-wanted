import AutoSizer from 'lp-react-virtualized-auto-sizer-react-18'
import { List } from '@mui/material'
import React, { useEffect } from 'react'
import Scrollbar from '../../components/Scrollbar'
import { FixedSizeList } from 'react-window'
import { useState } from 'react'
import { useVirtualLists } from '../../providers/VirtualLists'
import { useTheme as useAppTheme } from '../../providers/Theme'

const CustomScrollbarsVirtualList = React.forwardRef((props, ref) => {
  const { style, ...rest } = props
  const { isRTL } = useAppTheme()
  return (
    <Scrollbar
      {...rest}
      forwardedRef={ref}
      style={{ ...style, overflow: 'hidden', direction: isRTL ? 'rtl' : 'ltr' }} //james- keep as maybe related to <FixedSizeList> props, will remove soon
    />
  )
})

export default function VirtualList(props) {
  const { list = [], listProps, Row, name, preserveScroll = true } = props
  const listRef = React.createRef()
  const [ref, setRef] = useState(false)
  const { getOffset, setOffset } = useVirtualLists()
  const { isRTL } = useAppTheme()

  useEffect(() => {
    const scrollOffset = getOffset(name)
    if (preserveScroll && ref && scrollOffset) {
      listRef.current.scrollTo(scrollOffset)
    }

    return () => {
      try {
        if (preserveScroll && listRef.current) {
          const offset = listRef.current.state.scrollOffset
          setOffset(name, offset)
        }
      } catch (error) {
        console.warn('Could not save scrollOffset', error)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])

  return (
    <AutoSizer style={{ height: '100%', width: '100%' }}>
      {({ height, width }) => {
        return (
          <List style={{ padding: 0 /* , direction: isRTL ? 'rtl':'ltr' */ }}>
            <FixedSizeList
              direction={isRTL ? 'rtl' : 'ltr'} //removes native scrollbar
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
