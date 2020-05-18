import ConfigProvider from '../../providers/Config/Provider'
import OnlineProvider from '../../providers/Online/Provider'
import React, { Suspense, lazy } from 'react'
import UpdateProvider from '../../providers/Update/Provider'
import AddToHomeScreenProvider from '../../providers/AddToHomeScreen/Provider'
import defaultConfig from '../../config'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Layout = lazy(() => import('../../containers/Layout/Layout'))

const App = ({ config: appConfig }) => {
  const config = { ...defaultConfig, ...appConfig }
  const { pages, components, containers, update } = config
  const { LandingPage = false } = pages || {}
  const { checkInterval = 5000 } = update || {}
  const { Loading } = components || {}
  const { AppContainer = React.Fragment } = containers || {}

  return (
    <Suspense fallback={<Loading />}>
      <ConfigProvider appConfig={config}>
        <AddToHomeScreenProvider>
          <UpdateProvider checkInterval={checkInterval}>
            <AppContainer>
              <Router>
                <OnlineProvider>
                  <Switch>
                    {LandingPage && (
                      <Route path="/" exact component={LandingPage} />
                    )}
                    <Route component={Layout} />
                  </Switch>
                </OnlineProvider>
              </Router>
            </AppContainer>
          </UpdateProvider>
        </AddToHomeScreenProvider>
      </ConfigProvider>
    </Suspense>
  )
}

export default App
