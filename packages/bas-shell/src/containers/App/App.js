import A2HSProvider from 'a2hs'
import Loadable from 'react-loadable'
import React from 'react'
//import config from '../../config'
import configureStore from '../../store'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
//import Analytics from '../../containers/Analytics/Analytics'

const App = ({ appConfig }) => {
  const store = configureStore()
  const configs = { ...appConfig }
  const { landingPage: LandingPage = false } = configs

  return (
    <A2HSProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            {LandingPage && (
              <Route path="/" exact>
                <React.Fragment>
                  <div>LANDING PAGE</div>
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
  )
}

export default App
