import React, {useState, useEffect} from 'react'
import IconButton from '@material-ui/core/IconButton'
import { injectIntl } from 'react-intl'
import { GitHubIcon } from 'rmw-shell/lib/components/Icons'
import { Activity } from 'rmw-shell'
import ReactMarkdown from 'react-markdown'
import Scrollbar from 'rmw-shell/lib/components/Scrollbar/Scrollbar'
import README from './README.md'

require('github-markdown-css')

const About=({intl}) =>{
    const [text, setText] = useState('')

    useEffect(() => {
      fetch(README)
            .then(response => response.text())
            .then(txt => {
           setText(txt)
            })
  }, []);

      return (
      <Activity
        appBarContent={
          <IconButton
            href="https://github.com/TarikHuber/react-most-wanted"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon />
          </IconButton>
        }
        title={intl.formatMessage({ id: 'about' })}
      >
        <Scrollbar>
          <div style={{ backgroundColor: 'white', padding: 12 }}>
            <ReactMarkdown className="markdown-body" source={text} />
          </div>
        </Scrollbar>
      </Activity>
    )
}
export default injectIntl(About)