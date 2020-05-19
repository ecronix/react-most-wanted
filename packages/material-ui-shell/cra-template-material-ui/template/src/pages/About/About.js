import React, { useEffect, useState } from 'react'
import { injectIntl } from 'react-intl'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar'
import ReactMarkdown from 'react-markdown'
import README from './README.md'

require('github-markdown-css')

const AboutPage = ({ intl }) => {
  return (
    <Page pageTitle={intl.formatMessage({ id: 'about' })}>
      <Scrollbar>
        <div style={{ backgroundColor: 'white', padding: 12 }}>
          <ReactMarkdown
            className="markdown-body"
            source={README}
            escapeHtml={true}
          />
        </div>
      </Scrollbar>
    </Page>
  )
}
export default injectIntl(AboutPage)
