import React from 'react'
import { injectIntl } from 'react-intl'
import Page from 'material-ui-shell/lib/containers/Page/Page'

const HomePage = ({ intl }) => {
  return <Page pageTitle={intl.formatMessage({ id: 'home' })}>{intl.formatMessage({ id: 'home' })}</Page>
}
export default injectIntl(HomePage)
  ``