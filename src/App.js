import React from 'react'
import Loadable from 'react-loadable'
import LoadingComponent from 'rmw-shell/lib/components/LoadingComponent'
import A2HSProvider from 'a2hs'

const Loading = () => <LoadingComponent />

export const MainAsync = Loadable({
  loader: () => import('../src/containers/Main'),
  loading: Loading
})

export const LPAsync = Loadable({
  loader: () => import('../src/pages/LandingPage'),
  loading: Loading
})

const App = () => {
  return (
    <A2HSProvider>
      <MainAsync />
    </A2HSProvider>
  )

  /*
  return (
    <A2HSProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={LPAsync} />
          <Route component={MainAsync} />
        </Switch>
      </Router>
    </A2HSProvider>
  )
  */
}

export default App
