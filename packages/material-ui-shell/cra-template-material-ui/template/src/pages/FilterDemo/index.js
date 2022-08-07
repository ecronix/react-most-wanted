import AutoSizer from 'lp-react-virtualized-auto-sizer-react-18'
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import { FilterList } from '@mui/icons-material'
import FilterDrawer from 'material-ui-shell/lib/components/FilterDrawer'
import Page from 'material-ui-shell/lib/containers/Page'
import React, { useEffect, useCallback } from 'react'
import SearchField from 'material-ui-shell/lib/components/SearchField'
import source from './data.json'
import { FixedSizeList } from 'react-window'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { useFilter } from 'material-ui-shell/lib/providers/Filter'
import { useIntl } from 'react-intl'
import { useTheme as useAppTheme } from 'material-ui-shell/lib/providers/Theme'

const filterName = 'test_filter'

const CustomScrollbars = ({ onScroll, forwardedRef, style, children }) => {
  const { isRTL } = useAppTheme()
  const refSetter = useCallback((scrollbarsRef) => {
    if (scrollbarsRef) {
      forwardedRef(scrollbarsRef.view)
    } else {
      forwardedRef(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Scrollbars
      ref={refSetter}
      renderView={(props) =>
        isRTL ? (
          <div
            {...props}
            style={{
              ...props.style,
              marginLeft: props.style.marginRight,
              marginRight: 0,
            }}
          />
        ) : (
          <div
            {...props}
            style={{
              ...props.style,
            }}
          />
        )
      }
      // style={{ ...style, overflow: 'hidden' }}
      style={{ ...style, overflow: 'hidden', direction: isRTL ? 'rtl' : 'ltr' }} //james - test code should fix native scrollbars in demofilter and maybe in RMW demos,
      onScroll={onScroll}
    >
      {children}
    </Scrollbars>
  )
}

const CustomScrollbarsVirtualList = React.forwardRef((props, ref) => (
  <CustomScrollbars {...props} forwardedRef={ref} />
))

const FilterDemo = () => {
  const intl = useIntl()
  const { openFilter, getList, getFilter, setSearch } = useFilter()

  const { queries = [], search = {} } = getFilter(filterName)
  const { value: searchValue = '' } = search

  const fields = [
    {
      name: 'name',
      label: 'Name',
    },
    {
      name: 'email',
      label: 'E-Mail',
    },
    {
      name: 'amount',
      label: 'Amount',
      type: 'number',
    },
    {
      name: 'isActive',
      label: 'Active',
      type: 'bool',
    },
    {
      name: 'registered',
      label: 'Registered',
      type: 'date',
    },
    {
      name: 'registrationTime',
      label: 'Registration time',
      type: 'time',
    },
  ]

  const list = getList(filterName, source, fields)

  const listRef = React.createRef()

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToItem(1500, 'center')
    }
  }, [listRef])

  const Row = ({ index, style }) => {
    const { name, amount = '', registered, email } = list[index]

    return (
      <div key={`${name}_${index}`} style={style}>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={`${name} ${index}`}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textSecondary"
                >
                  {email}
                </Typography>
                <br />
                <Typography
                  component="span"
                  variant="body2"
                  color="textSecondary"
                >
                  {`${amount} ${registered}`}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider />
      </div>
    )
  }

  return (
    <Page
      pageTitle={intl.formatMessage(
        {
          id: 'filter_demo',
          defaultMessage: 'Filter demo with {count} rows',
        },
        { count: list.length }
      )}
      contentStyle={{ overflow: 'hidden' }}
      appBarContent={
        <Toolbar disableGutters>
          <SearchField
            initialValue={searchValue}
            onChange={(v) => {
              setSearch(filterName, v)
            }}
          />
          <IconButton color="inherit" onClick={() => openFilter(filterName)}>
            <FilterList color={queries.length > 0 ? 'secondary' : undefined} />
          </IconButton>
        </Toolbar>
      }
    >
      <AutoSizer style={{ height: '100%', width: '100%' }}>
        {({ height, width }) => {
          return (
            <List disablePadding={true}>
              <FixedSizeList
                className="List"
                ref={listRef}
                height={height}
                itemCount={list.length}
                itemSize={91}
                width={width}
                outerElementType={CustomScrollbarsVirtualList}
              >
                {Row}
              </FixedSizeList>
            </List>
          )
        }}
      </AutoSizer>
      <FilterDrawer fields={fields} name={filterName} />
    </Page>
  )
}

export default FilterDemo
