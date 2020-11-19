import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import Page from 'material-ui-shell/lib/containers/Page'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar'
import ReactMarkdown from 'react-markdown'
import 'github-markdown-css'

const About = () => {
  const [source, setSource] = useState(null)
  const intl = useIntl()

  const loadData = async () => {
    const data = await fetch(
      'https://raw.githubusercontent.com/TarikHuber/react-most-wanted/master/README.md'
    )
    const text = await data.text()
    setSource(text)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <Page
      pageTitle={intl.formatMessage({ id: 'about', defaultMessage: 'About' })}
    >
      <Scrollbar>
        <div style={{ backgroundColor: 'white', padding: 12 }}>
          {source && (
            <ReactMarkdown
              className="markdown-body"
              source={source}
              escapeHtml
            />
          )}
        </div>
      </Scrollbar>
    </Page>
  )
}
export default About