/* eslint-disable react/jsx-key */
import React, { lazy } from "react";
import {
  AuthorizedRoute,
  UnauthorizedRoute,
} from "@ecronix/base-shell/components";

const SignIn = lazy(() => import("../pages/SignIn/SignIn"));
const About = lazy(() => import("../pages/About/About"));
const Home = lazy(() => import("../pages/Home/Home"));

const routes = [
  {
    path: "/signin",
    exact: true,
    element: (
      <UnauthorizedRoute>
        <SignIn />
      </UnauthorizedRoute>
    ),
  },
  { path: "/about", exact: true, element: <About /> },
  {
    path: "/home",
    exact: true,
    element: (
      <AuthorizedRoute>
        <Home />
      </AuthorizedRoute>
    ),
  },
];

export default routes;
