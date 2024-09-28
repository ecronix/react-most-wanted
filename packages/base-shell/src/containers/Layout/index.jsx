import React, { Suspense, useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { useLocale, useConfig, getLocaleMessages } from "@ecronix/base-shell";
import UpdateProvider from "@ecronix/base-shell/providers/Update/Provider";
import AuthProvider from "@ecronix/base-shell/providers/Auth/Provider";
import AddToHomeScreenProvider from "@ecronix/base-shell/providers/AddToHomeScreen/Provider";
import OnlineProvider from "@ecronix/base-shell/providers/Online/Provider";
import SimpleValuesProvider from "@ecronix/base-shell/providers/SimpleValues/Provider";
import LocaleProvider from "@ecronix/base-shell/providers/Locale/Provider";

export const LayoutContent = ({ appConfig = {} }) => {
  const [messages, setMessages] = useState([]);
  const {
    components,
    routes = [],
    containers,
    locale: confLocale,
    getDefaultRoutes,
    auth,
    update,
  } = appConfig || {};
  const { persistKey } = auth || {};
  const { checkInterval = 5000 } = update || {};
  const { Menu, Loading = () => <div>Loading...</div> } = components || {};
  const { locales, onError } = confLocale || {};
  const { LayoutContainer = React.Fragment } = containers || {};
  const defaultRoutes = getDefaultRoutes ? getDefaultRoutes(appConfig) : [];
  const { locale = {} } = useLocale();

  useEffect(() => {
    const loadPolyfills = async () => {
      //loadLocalePolyfill(locale)

      if (locale.locales && locale.locales.length > 0) {
        for (let i = 0; i < locales.length; i++) {
          const l = locales[i];
          if (l.locale === locale) {
            if (l.loadData) {
              await l.loadData;
            }
          }
        }
      }
    };
    loadPolyfills();
  }, [locale, locales]);

  useEffect(() => {
    const loadMessages = async () => {
      const messages = await getLocaleMessages(locale, locales);
      setMessages(messages);
    };
    loadMessages();
  }, [locale, locales]);

  return (
    <AuthProvider persistKey={persistKey}>
      <SimpleValuesProvider>
        <AddToHomeScreenProvider>
          <UpdateProvider checkInterval={checkInterval}>
            <OnlineProvider>
              <IntlProvider
                locale={locale}
                key={locale}
                messages={messages}
                onError={onError}
              >
                <LayoutContainer>
                  <Suspense fallback={<Loading />}>{Menu && <Menu />}</Suspense>
                  <Suspense fallback={<Loading />}>
                    {useRoutes([...routes, ...defaultRoutes])}
                  </Suspense>
                </LayoutContainer>
              </IntlProvider>
            </OnlineProvider>
          </UpdateProvider>
        </AddToHomeScreenProvider>
      </SimpleValuesProvider>
    </AuthProvider>
  );
};

export const Layout = () => {
  const { appConfig } = useConfig();
  const { locale } = appConfig || {};
  const { defaultLocale, persistKey } = locale || {};
  return (
    <LocaleProvider defaultLocale={defaultLocale} persistKey={persistKey}>
      <LayoutContent appConfig={appConfig} />
    </LocaleProvider>
  );
};

export default Layout;
