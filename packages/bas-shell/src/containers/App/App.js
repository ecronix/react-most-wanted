import A2HSProvider from 'a2hs'
import AppLayout from '../../containers/AppLayout/AppLayout'
import ConfigProvider from '../../providers/ConfigProvider/Provider'
import React from 'react'
import Routes from '../../containers/Routes/Routes'
import UpdateProvider from '../../providers/UpdateProvider/Provider'
import configureStore from '../../store'
import defaultConfig from '../../config'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

const App = ({ config: appConfig }) => {
  const store = configureStore()
  const config = { ...defaultConfig, ...appConfig }
  const { landingPage: LandingPage = false } = config

  return (
    <ConfigProvider appConfig={config}>
      <UpdateProvider appConfig={config}>
        <A2HSProvider>
          <Provider store={store}>
            <Router>
              <Switch>
                {LandingPage && (
                  <Route path="/" exact>
                    <React.Fragment>
                      <LandingPage />
                    </React.Fragment>
                  </Route>
                )}

                <Route>
                  <AppLayout />
                </Route>
              </Switch>
            </Router>
          </Provider>
        </A2HSProvider>
      </UpdateProvider>
    </ConfigProvider>
  )
}

export default App
