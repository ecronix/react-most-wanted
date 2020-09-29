import Button from '@material-ui/core/Button'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useFilter } from 'material-ui-shell/lib/providers/Filter'
import {
  numberField,
  textField,
} from 'material-ui-shell/lib/providers/Filter/fields'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import FilterList from '@material-ui/icons/FilterList'
import FilterDrawer from 'material-ui-shell/lib/components/FilterDrawer'
import source from './data.json'

const filterName = 'test_filter'

export default function () {
  const intl = useIntl()
  const { openFilter, getList } = useFilter()

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
      pageTitle={intl.formatMessage({
        id: 'filter_demo',
        defaultMessage: 'Filter demo',
      })}
      appBarContent={
        <Toolbar disableGutters>
          <IconButton color="inherit" onClick={() => openFilter(filterName)}>
            <FilterList />
          </IconButton>
        </Toolbar>
      }
    >
      <div style={{ margin: 8 }}>
        {list.map((row, i) => {
          return <p key={i}>{row.name}</p>
        })}
      </div>
      <FilterDrawer fields={fields} name={filterName} />
    </Page>
  )
}
