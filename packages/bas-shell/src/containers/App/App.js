import ConfigProvider from '../../providers/ConfigProvider/Provider'
import UpdateProvider from '../../providers/UpdateProvider/Provider'
import A2HSProvider from 'a2hs'
import Loadable from 'react-loadable'
import React from 'react'
import defaultConfig from '../../config'
import configureStore from '../../store'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
//import Analytics from '../../containers/Analytics/Analytics'

const App = ({ config: appConfig }) => {
  const store = configureStore()
  const config = { ...defaultConfig, ...appConfig }
  const { landingPage: LandingPage = false } = config

  return (
    <ConfigProvider appConfig={config}>
      <UpdateProvider appConfig={config}>
        <A2HSProvider>
          <Provider store={store}>
            <BrowserRouter>
              <Switch>
                {LandingPage && (
                  <Route path="/" exact>
                    <React.Fragment>
                      <LandingPage />
                    </React.Fragment>
                  </Route>
                )}
                <Switch>
                  <Route>
                    <div>ROUTES</div>
                  </Route>
                </Switch>
              </Switch>
            </BrowserRouter>
          </Provider>
        </A2HSProvider>
      </UpdateProvider>
    </ConfigProvider>
  )
}

export default App
