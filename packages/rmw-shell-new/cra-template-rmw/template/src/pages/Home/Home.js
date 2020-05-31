import React from 'react'
import { injectIntl } from 'react-intl'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import { withFirebase } from 'firekit-provider'

const HomePage = ({ intl, firebaseApp }) => {
  console.log('firebaseApp', firebaseApp)
  return (
    <Page pageTitle={intl.formatMessage({ id: 'home' })}>
      <Scrollbar
        style={{ height: '100%', width: '100%', display: 'flex', flex: 1 }}
      >
        {intl.formatMessage({ id: 'home' })}
      </Scrollbar>
    </Page>
  )
}
export default injectIntl(withFirebase(HomePage))
