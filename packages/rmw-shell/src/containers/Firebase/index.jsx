import React, { useEffect } from "react";
import { useConfig, useAuth } from "@ecronix/base-shell";
import PathsProvider from "@ecronix/rmw-shell/providers/Firebase/Paths/Provider";
import ListsProvider from "@ecronix/rmw-shell/providers/Firebase/Lists/Provider";
import DocsProvider from "@ecronix/rmw-shell/providers/Firebase/Docs/Provider";
import ColsProvider from "@ecronix/rmw-shell/providers/Firebase/Cols/Provider";
import MessagingProvider from "@ecronix/rmw-shell/providers/Firebase/Messaging/Provider";
import StorageProvider from "@ecronix/rmw-shell/providers/Firebase/Storage/Provider";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment as DateAdapter } from "@mui/x-date-pickers/AdapterMoment";
import { useLocale } from "@ecronix/base-shell";

export default function FirbaseContainer({ children }) {
  const { appConfig } = useConfig();
  const auth = useAuth();
  const { firebase: firebaseConfig, auth: authConfig = {} } = appConfig || {};
  const { prod = {}, dev = {} } = firebaseConfig || {};
  const { onAuthStateChanged: internalOnAuthStateChanged } = authConfig || {};
  const { locale = "en" } = useLocale();

  if (getApps().length === 0) {
    initializeApp(
      process.env.NODE_ENV !== "production" ? dev.initConfig : prod.initConfig,
    );
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(getApp()), (user) => {
      if (onAuthStateChanged) {
        internalOnAuthStateChanged(user, auth);
      }
    });

    return () => {
      unsubscribe();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PathsProvider>
      <ListsProvider>
        <DocsProvider>
          <ColsProvider>
            <StorageProvider>
              <MessagingProvider>
                <LocalizationProvider
                  dateAdapter={DateAdapter}
                  adapterLocale={locale}
                >
                  {children}
                </LocalizationProvider>
              </MessagingProvider>
            </StorageProvider>
          </ColsProvider>
        </DocsProvider>
      </ListsProvider>
    </PathsProvider>
  );
}
