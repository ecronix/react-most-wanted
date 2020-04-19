import React from 'react'
import { injectIntl } from 'react-intl'
import Page from 'material-ui-shell/lib/containers/Page/Page'

const AboutPage = ({ intl }) => {
  return <Page>{intl.formatMessage({ id: 'about' })}</Page>
}
export default injectIntl(AboutPage)

