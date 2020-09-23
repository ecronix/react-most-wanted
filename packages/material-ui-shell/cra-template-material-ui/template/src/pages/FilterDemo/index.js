import Button from '@material-ui/core/Button'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import React from 'react'
import { useIntl } from 'react-intl'
import { useFilter } from 'material-ui-shell/lib/providers/Filter'

export default function () {
  const intl = useIntl()
  const { openFilter, closeFilter, clearFilter } = useFilter()

  return (
    <Page
      pageTitle={intl.formatMessage({
        id: 'filter_demo',
        defaultMessage: 'Filter demo',
      })}
    >
      <br />
      <Button onClick={() => openFilter('test_filter')}>OPEN Filter</Button>
      <br />
      <Button onClick={() => closeFilter('test_filter')}>Close Filter</Button>
      <br />
      <Button onClick={() => clearFilter('test_filter')}>Clear Filter</Button>
    </Page>
  )
}
