import Button from '@material-ui/core/Button'
import FilterDrawer from 'material-ui-shell/lib/components/FilterDrawer'
import FilterList from '@material-ui/icons/FilterList'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import React, { useEffect } from 'react'
import ReactList from 'react-list'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar'
import SearchField from 'material-ui-shell/lib/components/SearchField'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import source from './data.json'
import { useFilter } from 'material-ui-shell/lib/providers/Filter'
import { useIntl } from 'react-intl'
import {
  numberField,
  textField,
} from 'material-ui-shell/lib/providers/Filter/fields'

const filterName = 'test_filter'

export default function () {
  const intl = useIntl()
  const { openFilter, getList, getFilter, setSearch } = useFilter()

  const { queries = [], search = {} } = getFilter(filterName)
  const { value: searchvalue = '' } = search

  const fields = [
    {
      ...textField,
      name: 'name',
      label: 'Name',
    },
    {
      ...textField,
      name: 'email',
      label: 'E-Mail',
    },
    {
      ...numberField,
      name: 'amount',
      label: 'Amount',
    },
  ]

  const list = getList(filterName, source, fields)

  return (
    <Page
      pageTitle={intl.formatMessage(
        {
          id: 'filter_demo',
          defaultMessage: 'Filter demo with {count} rows',
        },
        { count: list.length }
      )}
      appBarContent={
        <Toolbar disableGutters>
          <SearchField
            initialValue={searchvalue}
            onChange={(v) => {
              console.log('v', v)
              setSearch(filterName, v)
            }}
          />
          <IconButton color="inherit" onClick={() => openFilter(filterName)}>
            <FilterList color={queries.length > 0 ? 'secondary' : undefined} />
          </IconButton>
        </Toolbar>
      }
    >
      <Scrollbar>
        <List>
          <ReactList
            itemRenderer={(i) => {
              const { name, amount = '', registered, email } = list[i]
              return (
                <ListItem key={`${name}_${i}`} alignItems="flex-start">
                  <ListItemText
                    primary={name}
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
              )
            }}
            length={list ? list.length : 0}
            type="uniform"
          />
        </List>
      </Scrollbar>
      <FilterDrawer fields={fields} name={filterName} />
    </Page>
  )
}
