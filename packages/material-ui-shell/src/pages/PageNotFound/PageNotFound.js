import React from 'react'
import { injectIntl } from 'react-intl'
import Page from '../../containers/Page/Page'
const PageNotFound = ({ intl }) => {
  return <Page pageTitle={intl.formatMessage({ id: 'page_not_found' })} MUI>{intl.formatMessage({ id: 'page_not_found' })} MUI</Page>
}
export default injectIntl(PageNotFound)
