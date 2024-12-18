// @ts-ignore
import AutoSizer from 'lp-react-virtualized-auto-sizer-react-18'
import { List } from '@mui/material'
import React, { useEffect, MutableRefObject, ComponentType } from 'react'
import Scrollbar from '../../components/Scrollbar'
import {
  FixedSizeList,
  FixedSizeList as FixedSizeListType,
  ReactElementType,
} from 'react-window'

import { useState } from 'react'
import {
  useTheme as useAppTheme,
  useVirtualLists,
} from '@ecronix/material-ui-shell'

const CustomScrollbarsVirtualList = React.forwardRef((props: any, ref) => {
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

export type RowProps = {
  data: any
  index: number
  style: Object
}
type VirtualListContainerProps = {
  list: any
  listProps: Object
  Row: React.FC<RowProps>
  name: string
  preserveScroll?: boolean
}
export function VirtualListContainer(props: VirtualListContainerProps) {
  const { list = [], listProps, Row, name, preserveScroll = true } = props
  const listRef =
    React.createRef<FixedSizeListType>() as MutableRefObject<FixedSizeListType>
  const [ref, setRef] = useState(false)
  const { getOffset, setOffset } = useVirtualLists()
  const { isRTL } = useAppTheme()

  useEffect(() => {
    const scrollOffset = getOffset(name)
    if (preserveScroll && ref && scrollOffset) {
      listRef.current?.scrollTo(scrollOffset)
    }

    return () => {
      try {
        if (preserveScroll && listRef.current) {
          // @ts-expect-error
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
      {({ height, width }: { height: number; width: number }) => {
        return (
          <List style={{ padding: 0 /* , direction: isRTL ? 'rtl':'ltr' */ }}>
            {/* @ts-ignore */}
            <FixedSizeList // Having issues with typescript and react v18
              direction={isRTL ? 'rtl' : 'ltr'} //removes native scrollbar
              ref={(r) => {
                if (r) {
                  listRef.current = r
                  setRef(true)
                }
              }}
              height={height}
              itemCount={list.length}
              itemSize={100}
              width={width}
              outerElementType={CustomScrollbarsVirtualList as ReactElementType}
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
