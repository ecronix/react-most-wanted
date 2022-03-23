import React, { Suspense, lazy } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import ConfigProvider from '../../providers/Config/Provider'

const Layout = lazy(() => import('../../containers/Layout/Layout'))

const App = ({ config: appConfig }) => {
  const config = { ...appConfig }
  const { pages, components, containers } = config
  const { LandingPage = false } = pages || {}
  const { Loading = () => <div /> } = components || {}
  const { AppContainer = React.Fragment } = containers || {}

  return (
    <Suspense fallback={<Loading />}>
      <ConfigProvider appConfig={config}>
        <AppContainer>
          <HashRouter>
            <Routes>
              {LandingPage && (
                <Route path="/" exact element={<LandingPage />} />
              )}
              <Route
                path="*"
                element={
                  <Suspense fallback={<Loading />}>
                    <Layout appConfig={config} />
                  </Suspense>
                }
              />
            </Routes>
          </HashRouter>
        </AppContainer>
      </ConfigProvider>
    </Suspense>
  )
}

export default App
