import A2HSProvider from 'a2hs'
import ConfigProvider from '../../providers/ConfigProvider/Provider'
import React, { Suspense, lazy } from 'react'
import Routes from '../../containers/Routes/Routes'
import UpdateProvider from '../../providers/UpdateProvider/Provider'
import configureStore from '../../store'
import defaultConfig from '../../config'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

const AppLayout = lazy(() => import('../../containers/AppLayout/AppLayout'))

const App = ({ config: appConfig }) => {
  const store = configureStore()
  const config = { ...defaultConfig, ...appConfig }
  const { pages, components } = config
  const { LandingPage = false } = pages || {}
  const { Loading } = components || {}

  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <ConfigProvider appConfig={config}>
          <UpdateProvider appConfig={config}>
            <A2HSProvider>
              <Provider store={store}>
                <Switch>
                  {LandingPage && (
                    <Route path="/" exact component={LandingPage} />
                  )}
                  <Route component={AppLayout} />
                </Switch>
              </Provider>
            </A2HSProvider>
          </UpdateProvider>
        </ConfigProvider>
      </Router>
    </Suspense>
  )
}

export default App
