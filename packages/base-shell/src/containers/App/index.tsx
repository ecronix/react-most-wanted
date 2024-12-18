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
    Menu?: React.ComponentType;
    Loading?: React.ComponentType;
  };
  containers?: {
    AppContainer?: React.ComponentType;
    LayoutContainer?: React.ComponentType;
  };
  [key: string]: any;
}

/**
 * React component that serves as the main container for the application.
 *
 * This component receives configuration data as props and manages the
 * high-level layout or setup for the application.
 *
 * @param {AppContainerProps} props - The properties passed to the `AppContainer` component.
 * @param {AppConfig} props.config - The application configuration object.
 *
 * @returns The rendered application container with embedded router and Loading component.
 *
 * @example
 *
 * <AppContainer config={appConfig} />
 */
export const AppContainer: React.FC<AppContainerProps> = ({
  config: appConfig,
}) => {
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
              {LandingPage && <Route path="/" element={<LandingPage />} />}
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
