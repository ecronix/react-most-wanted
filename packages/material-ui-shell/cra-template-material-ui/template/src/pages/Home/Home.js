import React from 'react'
import { injectIntl } from 'react-intl'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'

const HomePage = ({ intl }) => {
  return (
    <Page pageTitle={intl.formatMessage({ id: 'home' })}>
      <Scrollbar
        style={{ height: '100%', width: '100%', display: 'flex', flex: 1 }}
      >
        <div style={{ width: 500, height: 500, backgroundColor: 'red' }}></div>
        {intl.formatMessage({ id: 'home' })}
      </Scrollbar>
    </Page>
  )
}
export default injectIntl(HomePage)
