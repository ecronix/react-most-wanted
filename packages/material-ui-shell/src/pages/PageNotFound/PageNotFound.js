import React from 'react'
import { injectIntl } from 'react-intl'

const PageNotFound = ({ intl }) => {
  return <div>{intl.formatMessage({ id: 'page_not_found' })} MUI</div>
}
export default injectIntl(PageNotFound)
