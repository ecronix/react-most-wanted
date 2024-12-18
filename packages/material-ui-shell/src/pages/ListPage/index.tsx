import FilterDrawer from '../../components/FilterDrawer'
import { Page, RowProps } from '@ecronix/material-ui-shell'
import React from 'react'
import SearchField from '../../components/SearchField'
import { Toolbar, IconButton } from '@mui/material'
import { FilterList } from '@mui/icons-material'
import { useFilter, VirtualListContainer } from '@ecronix/material-ui-shell'

type ListPageProps = {
  fields?: any
  list?: any
  getPageProps: (data: any) => {}
  listProps: any
  Row: React.FC<RowProps>
  name: string
  trailing?: string | null
  leading?: any | null
  disableSearch?: boolean
  disableFilter?: boolean
  top?: React.ReactNode
  bottom?: React.ReactNode
  parseList?: (data: any) => void
}

/**
 * `ListPage` component that renders a page containing a list of items with optional search, filter, and custom top/bottom content.
 * It provides functionality for managing list data, applying search filters, and rendering custom row components.
 *
 * @example
 * return (
 *   <ListPage
 *     name="myList"
 *     fields={myFields}
 *     list={myListData}
 *     getPageProps={(data) => ({ title: 'My List Page', data })}
 *     listProps={{ someProp: 'value' }}
 *     Row={RowComponent}
 *     disableSearch={false}
 *     disableFilter={false}
 *     top={<CustomTopContent />}
 *     bottom={<CustomBottomContent />}
 *     parseList={(data) => data.filter(item => item.active)}
 *   />
 * )
 *
 * @param {Object} props - Component props.
 * @param {any[]} [props.fields=[]] - Fields to be used for filtering or displaying data in the list.
 * @param {any[]} [props.list=[]] - The source list of items to display.
 * @param {(data: any) => {}} props.getPageProps - A function to get additional page props (e.g., title, other page settings).
 * @param {any} props.listProps - Properties to pass to the list rendering component.
 * @param {React.FC<RowProps>} props.Row - The row component to render each item in the list.
 * @param {string} props.name - The name identifier for the list, used for managing search and filters.
 * @param {string | null} [props.trailing=null] - Optional content to render at the trailing (right) side of the app bar.
 * @param {React.ReactNode | null} [props.leading=null] - Optional content to render at the leading (left) side of the app bar.
 * @param {boolean} [props.disableSearch=false] - Flag to disable the search functionality.
 * @param {boolean} [props.disableFilter=false] - Flag to disable the filter functionality.
 * @param {React.ReactNode} [props.top=null] - Optional content to display at the top of the list page.
 * @param {React.ReactNode} [props.bottom=null] - Optional content to display at the bottom of the list page.
 * @param {(data: any) => any} [props.parseList=(l) => l] - A function to parse or transform the list data before rendering.
 *
 * @returns The rendered `ListPage` component with a list, optional filters, search, and custom content.
 */
export function ListPage(props: ListPageProps) {
  const {
    fields = [],
    list: source = [],
    getPageProps = () => {},
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
