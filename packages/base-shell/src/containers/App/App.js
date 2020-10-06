import AddToHomeScreenProvider from '../../providers/AddToHomeScreen/Provider'
import AuthProvider from '../../providers/Auth/Provider'
import ConfigProvider from '../../providers/Config/Provider'
import OnlineProvider from '../../providers/Online/Provider'
import React, { Suspense, lazy } from 'react'
import SimpleValuesProvider from '../../providers/SimpleValues/Provider'
import UpdateProvider from '../../providers/Update/Provider'
import defaultConfig from '../../config'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Layout = lazy(() => import('../../containers/Layout/Layout'))

const App = ({ config: appConfig }) => {
  const config = { ...defaultConfig, ...appConfig }
  const { pages, components, containers, update, auth } = config
  const { persistKey } = auth || {}
  const { LandingPage = false } = pages || {}
  const { checkInterval = 5000 } = update || {}
  const { Loading } = components || {}
  const { AppContainer = React.Fragment } = containers || {}

  return (
    <Suspense fallback={<Loading />}>
      <SimpleValuesProvider>
        <AuthProvider persistKey={persistKey}>
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
        </AuthProvider>
      </SimpleValuesProvider>
    </Suspense>
  )
}

export default App
