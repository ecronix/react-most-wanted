import A2HSProvider from 'a2hs'
import ConfigProvider from '../../providers/ConfigProvider/Provider'
import OnlineProvider from '../../providers/OnlineProvider/Provider'
import React, { Suspense, lazy } from 'react'
import UpdateProvider from '../../providers/UpdateProvider/Provider'
import defaultConfig from '../../config'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { combineReducers } from 'redux'

const Layout = lazy(() => import('../../containers/Layout/Layout'))

const App = ({ config: appConfig }) => {
  const config = { ...defaultConfig, ...appConfig }
  const { pages, components, containers } = config
  const { LandingPage = false } = pages || {}
  const { Loading } = components || {}
  const { AppContainer = React.Fragment } = containers || {}

  return (
    <Suspense fallback={<Loading />}>
      <AppContainer>
        <Router>
          <ConfigProvider appConfig={config}>
            <UpdateProvider appConfig={config}>
              <OnlineProvider>
                <A2HSProvider>
                  <Switch>
                    {LandingPage && (
                      <Route path="/" exact component={LandingPage} />
                    )}
                    <Route component={Layout} />
                  </Switch>
                </A2HSProvider>
              </OnlineProvider>
            </UpdateProvider>
          </ConfigProvider>
        </Router>
      </AppContainer>
    </Suspense>
  )
}

export default App
