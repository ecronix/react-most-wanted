import FilterDrawer from '../../components/FilterDrawer'
import { Page } from '@ecronix/material-ui-shell'
import React from 'react'
import SearchField from '../../components/SearchField'
import { Toolbar, IconButton } from '@mui/material'
import { FilterList } from '@mui/icons-material'
import { useFilter, VirtualListContainer } from '@ecronix/material-ui-shell'

export function ListPage(props) {
  const {
    fields = [],
    list: source = [],
    getPageProps = () => {},
    listContainerStyle = {},
    listProps,
    Row,
    name,
    trailing = null,
    leading = null,
    disableSearch = false,
    disableFilter = false,
    top = null,
    bottom = null,
    parseList = (l) => l,
  } = props
  const { openFilter, getList, getFilter, setSearch } = useFilter()
  const { queries = [], search = {} } = getFilter(name)
  const { value: searchValue = '' } = search

  const list = parseList(getList(name, source, fields))

  return (
    <Page
      contentStyle={{ overflow: 'hidden' }}
      appBarContent={
        <Toolbar disableGutters>
          {leading}
          {!disableSearch && (
            <SearchField
              initialValue={searchValue}
              onChange={(v) => {
                setSearch(name, v)
              }}
            />
          )}
          {fields.length > 0 && !disableFilter && (
            <IconButton color="inherit" onClick={() => openFilter(name)}>
              <FilterList
                color={queries.length > 0 ? 'secondary' : undefined}
              />
            </IconButton>
          )}
          {trailing}
        </Toolbar>
      }
      {...getPageProps(list)}
    >
      {top}

      <VirtualListContainer
        list={list}
        name={name}
        listProps={listProps}
        Row={Row}
      />

      {bottom}

      {fields.length > 0 && <FilterDrawer fields={fields} name={name} />}
    </Page>
  )
}
