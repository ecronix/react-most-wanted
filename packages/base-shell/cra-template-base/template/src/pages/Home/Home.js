import React from 'react'
import { useIntl } from 'react-intl'

const HomePage = () => {
  const intl = useIntl()
  return <div>{intl.formatMessage({ id: 'home' })}</div>
}
export default HomePage
