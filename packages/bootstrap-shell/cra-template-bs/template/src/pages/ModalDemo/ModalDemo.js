import Page from 'bootstrap-shell/lib/containers/Page'
import React from 'react'
import { useIntl } from 'react-intl'

const ModalDemo = () => {
  const intl = useIntl()

  return (
    <Page
      pageTitle={intl.formatMessage({
        id: 'toast_demo',
        defaultMessage: 'Toast demo',
      })}
    >
    </Page>
  )
}
export default ModalDemo
