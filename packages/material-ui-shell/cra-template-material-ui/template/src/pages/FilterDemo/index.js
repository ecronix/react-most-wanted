import Button from '@material-ui/core/Button'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useFilter } from 'material-ui-shell/lib/providers/Filter'

const filterName = 'test_filter'

const list1 = [{ number1: 1 }, { number1: 4 }, { number1: 2 }, { number1: 2 }]

const numberField = {
  operators: [
    { value: '=', label: '=' },
    { value: '>', label: '>' },
    { value: '<', label: '<' },
    { value: '!=', label: '!=' },
    { value: '>=', label: '<=' },
    { value: '>=', label: '>=' },
    { value: 'like', label: 'like' },
    { value: '!like', label: '!like' },
  ],
  filter: (operator, value, filterValue) => {
    switch (operator) {
      case '=':
        return value === filterValue
      case '>':
        return value > filterValue
      case '<':
        return value < filterValue
      case '!=':
        return value !== filterValue
      case '<=':
        return value <= filterValue
      case '>=':
        return value >= filterValue
      case 'like':
        return value.toString().indexOf(filterValue.toString()) !== -1
      case '!like':
        return value.toString().indexOf(filterValue.toString()) === -1
      default:
        return false
    }
  },
  sort: (orientation, a, b) => {
    var result = a < b ? -1 : a > b ? 1 : 0
    return result * orientation
  },
}

export default function () {
  const intl = useIntl()
  const {
    openFilter,
    closeFilter,
    clearFilter,
    setFields,
    addFilterQuery,
    getList,
  } = useFilter()

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

  useEffect(() => {
    setFields(filterName, fields)

    return () => clearFilter(filterName)
  }, [])

  console.log('list', getList(filterName, list1))

  return (
    <Page
      pageTitle={intl.formatMessage({
        id: 'filter_demo',
        defaultMessage: 'Filter demo',
      })}
    >
      <br />
      <Button onClick={() => openFilter(filterName)}>OPEN Filter</Button>
      <br />
      <Button onClick={() => closeFilter(filterName)}>Close Filter</Button>
      <br />
      <Button onClick={() => clearFilter(filterName)}>Clear Filter</Button>
      <br />
      <Button
        onClick={() =>
          addFilterQuery(filterName, {
            field: 'testfield',
            operator: '=',
            value: 'test',
          })
        }
      >
        Add Query
      </Button>
    </Page>
  )
}
