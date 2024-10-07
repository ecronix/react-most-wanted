/* eslint-disable react/jsx-key */
import React, { lazy } from "react";
import { AuthorizedRoute, UnauthorizedRoute } from "@ecronix/base-shell";
import { SignInPage } from "../pages/SignIn";
import { HomePage } from "../pages/Home";
import { AboutPage } from "../pages/About";

const routes = [
  {
    path: "/signin",
    exact: true,
    element: (
      <UnauthorizedRoute>
        <SignInPage />
      </UnauthorizedRoute>
    ),
  },
  { path: "/about", exact: true, element: <AboutPage /> },
  {
    path: "/home",
    exact: true,
    element: (
      <AuthorizedRoute>
        <HomePage />
      </AuthorizedRoute>
    ),
  },
];

export default routes;
