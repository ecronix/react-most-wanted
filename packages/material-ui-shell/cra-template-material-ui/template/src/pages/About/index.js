import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import Page from 'material-ui-shell/lib/containers/Page'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar'
import ReactMarkdown from 'react-markdown'

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
        <div style={{ padding: 12 }}>
          {source && (
            <ReactMarkdown className="markdown-body" children={source} />
          )}
        </div>
      </Scrollbar>
    </Page>
  )
}
export default About
