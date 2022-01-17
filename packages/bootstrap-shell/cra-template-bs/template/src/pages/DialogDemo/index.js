import React from 'react'
import { useIntl } from 'react-intl'
import Page from 'bootstrap-shell/lib/containers/Page/Page'


const Dialog = () => {
  const intl = useIntl()

  return <Page brand={intl.formatMessage({
    id: 'dialog_demo',
    defaultMessage: 'Dialog demo',
  })}>
    Dialog Demo
  </Page>
}

export default Dialog
