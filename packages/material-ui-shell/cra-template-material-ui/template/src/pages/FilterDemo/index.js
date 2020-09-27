import Button from '@material-ui/core/Button'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useFilter } from 'material-ui-shell/lib/providers/Filter'
import { numberField } from 'material-ui-shell/lib/providers/Filter/fields'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import FilterList from '@material-ui/icons/FilterList'
import FilterDrawer from 'material-ui-shell/lib/components/FilterDrawer'

const filterName = 'test_filter'

const source = [{ number1: 1 }, { number1: 4 }, { number1: 3 }, { number1: 2 }]

export default function () {
  const intl = useIntl()
  const { openFilter, getList } = useFilter()

  const fields = [
    {
      name: 'number1',
      label: 'Test Field 1',
      ...numberField,
    },
    {
      name: 'number2',
      label: 'Test Field 2',
      ...numberField,
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
      <div>
        {list.map((row) => {
          return <p>{row.number1}</p>
        })}
      </div>
      <FilterDrawer fields={fields} name={filterName} />
    </Page>
  )
}
