import 'github-markdown-css'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import README from './README.md'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar'
import { injectIntl } from 'react-intl'

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
