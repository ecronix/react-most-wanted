import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LayoutContainer, ConfigProvider } from "@ecronix/base-shell";

export const AppContainer = ({ config: appConfig }) => {
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
                    <LayoutContainer appConfig={config} />
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
