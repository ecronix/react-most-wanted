import { AppBar, Tab, Tabs } from '@mui/material'
import Page from 'material-ui-shell/lib/containers/Page'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'

const TabsDemo = () => {
  const [tab, setTab] = useState('one')
  const intl = useIntl()

  return (
    <Page
      pageTitle={intl.formatMessage({
        id: 'tabs_demo',
        defaultMessage: 'Tabs demo',
      })}
      tabs={
        <AppBar position="static">
          <Tabs
            value={tab}
            onChange={(e, t) => setTab(t)}
            aria-label="simple tabs example"
            centered
            textColor="inherit"
            indicatorColor="secondary"
          >
            <Tab label="Item One" value="one" />
            <Tab label="Item Two" value="two" />
            <Tab label="Item Three" value="three" />
          </Tabs>
        </AppBar>
      }
    >
      <div>
        {tab === 'one' && <div>One</div>}
        {tab === 'two' && <div>Two</div>}
        {tab === 'three' && <div>Three</div>}
      </div>
    </Page>
  )
}
export default TabsDemo
