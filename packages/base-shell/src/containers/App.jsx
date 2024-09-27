import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ConfigProvider from "@ecronix/base-shell/providers/Config/Provider";
import { default as Layout } from "@ecronix/base-shell/containers/Layout";

const App = ({ config: appConfig }) => {
  const config = { ...appConfig };
  const { pages, components, containers } = config;
  const { LandingPage = false } = pages || {};
  const { Loading = () => <div /> } = components || {};
  const { AppContainer = React.Fragment } = containers || {};

  return (
    <Suspense fallback={<Loading />}>
      <ConfigProvider appConfig={config}>
        <AppContainer>
          <BrowserRouter>
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
          </BrowserRouter>
        </AppContainer>
      </ConfigProvider>
    </Suspense>
  );
};

export default App;
