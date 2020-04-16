import React from 'react'
import { injectIntl } from 'react-intl'

const HomePage = ({ intl }) => {
  return <div>{intl.formatMessage({ id: 'home' })}</div>
}
export default injectIntl(HomePage)