import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LayoutContainer, ConfigProvider } from "@ecronix/base-shell";

interface AppContainerProps {
  config: AppConfig;
}

export interface AppConfig {
  pages?: {
    LandingPage?: React.ComponentType;
  };
  components?: {
    Loading?: React.ComponentType;
  };
  containers?: {
    AppContainer?: React.ComponentType;
  };
  [key: string]: any;
}

export const AppContainer: React.FC<AppContainerProps> = ({ config: appConfig }) => {
  const config: AppConfig = { ...appConfig };
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
              <Route path="/" element={<LandingPage />} />
            )}
              <Route
                path="*"
                element={
                  <Suspense fallback={<Loading />}>
                  <LayoutContainer />
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
