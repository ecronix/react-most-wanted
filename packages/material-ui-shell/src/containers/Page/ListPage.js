import FilterDrawer from 'material-ui-shell/lib/components/FilterDrawer'
import FilterList from '@material-ui/icons/FilterList'
import IconButton from '@material-ui/core/IconButton'
import Page from 'material-ui-shell/lib/containers/Page'
import React from 'react'
import SearchField from 'material-ui-shell/lib/components/SearchField'
import Toolbar from '@material-ui/core/Toolbar'
import VirtualList from 'material-ui-shell/lib/containers/VirtualList'
import { useFilter } from 'material-ui-shell/lib/providers/Filter'

export default function (props) {
  const {
    fields = [],
    list: source = [],
    getPageProps = () => {},
    listProps,
    Row,
    name,
  } = props
  const { openFilter, getList, getFilter, setSearch } = useFilter()
  const { queries = [], search = {} } = getFilter(name)
  const { value: searchvalue = '' } = search

  const list = getList(name, source, fields)

  return (
    <Page
      contentStyle={{ overflow: 'hidden' }}
      appBarContent={
        <Toolbar disableGutters>
          <SearchField
            initialValue={searchvalue}
            onChange={(v) => {
              setSearch(name, v)
            }}
          />
          <IconButton color="inherit" onClick={() => openFilter(name)}>
            <FilterList color={queries.length > 0 ? 'secondary' : undefined} />
          </IconButton>
        </Toolbar>
      }
      {...getPageProps(list)}
    >
      <VirtualList list={list} name={name} listProps={listProps} Row={Row} />

      <FilterDrawer fields={fields} name={name} />
    </Page>
  )
}
