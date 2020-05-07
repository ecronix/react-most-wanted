import React from 'react'
import { injectIntl } from 'react-intl'
import Page from 'material-ui-shell/lib/containers/Page/Page'

const PageNotFound = ({ intl }) => {
  return <Page pageTitle={intl.formatMessage({ id: 'page_not_found' })}>{intl.formatMessage({ id: 'page_not_found' })}</Page>
}
export default injectIntl(PageNotFound)