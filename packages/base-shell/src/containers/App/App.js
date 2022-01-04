import React, { Suspense, lazy } from 'react'
import defaultConfig from '../../config'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Layout = lazy(() => import('../../containers/Layout/Layout'))

const App = ({ config: appConfig }) => {
  const config = { ...defaultConfig, ...appConfig }
  const { pages, components, containers } = config
  const { LandingPage = false } = pages || {}
  const { Loading = () => <div /> } = components || {}
  const { AppContainer = React.Fragment } = containers || {}

  return (
    <AppContainer>
      <BrowserRouter>
        <Routes>
          {LandingPage && <Route path="/" exact element={<LandingPage />} />}
          <Route
            path="*"
            element={
              <Suspense fallback={<Loading />}>
                <Layout appConfig={config} />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  )
}

export default App
