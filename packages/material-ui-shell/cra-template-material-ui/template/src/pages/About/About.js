import React from 'react'
import { injectIntl } from 'react-intl'
import Page from 'material-ui-shell/lib/containers/Page/Page'

const AboutPage = ({ intl }) => {
  return (
    <Page pageTitle={intl.formatMessage({ id: 'about' })}>
      <div>{intl.formatMessage({ id: 'about' })}</div>
    </Page>
  )
}
export default injectIntl(AboutPage)
