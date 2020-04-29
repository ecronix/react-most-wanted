import React from 'react'
import { injectIntl } from 'react-intl'

const AboutPage = ({ intl }) => {
  return <div>{intl.formatMessage({ id: 'about' })}</div>
}

export default injectIntl(AboutPage)
