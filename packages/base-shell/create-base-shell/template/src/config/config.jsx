import React from "react";
import locales from "./locales";
import routes from "./routes";
import defaultRoutes from "./defaultRoutes";
import getMenuItems from "./menuItems";
import { parseLanguages } from "@ecronix/base-shell";
import { LandingPage } from "../pages/LandingPage";
import { PageNotFound } from "../pages/PageNotFound";
import { MenuContainer } from "../containers/Menu";

const Loading = () => <div>Loading...</div>;

const config = {
  getDefaultRoutes: defaultRoutes,
  locale: {
    defaultLocale: parseLanguages(["en", "de", "ru"], "en"),
    locales,
    persistKey: "base-shell:locale",
    onError: (e) => {
      //Uncomment this to show react-intl missing translation warnings
      //console.warn(e)
      return;
    },
  },
  auth: {
    persistKey: "base-shell:auth",
    signInURL: "/signin",
    redirectTo: "/",
  },
  routes,
  menu: {
    getMenuItems,
  },
  pages: {
    LandingPage,
    PageNotFound,
  },
  components: {
    Menu: MenuContainer,
    Loading,
  },
  containers: {
    AppContainer: ({ children }) => (
      <div>App Container top {children} App Container bottom</div>
    ),

    LayoutContainer: ({ children }) => (
      <div>Layout Container top {children} Layout Container bottom</div>
    ),
  },
};

export default config;
