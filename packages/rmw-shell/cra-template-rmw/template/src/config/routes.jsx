/* eslint-disable react/jsx-key */
import { AuthorizedRoute } from "@ecronix/base-shell";
import React from "react";
import About from "../pages/About";
import Admin from "../pages/Demo/Admin";
import Companies from "../pages/Demo/Companies";
import Company from "../pages/Demo/Companies/Company";
import Tasks from "../pages/Demo/Tasks";
import Task from "../pages/Demo/Tasks/Task";
import FirebaseCols from "../pages/Firebase/Cols";
import FirebaseDocs from "../pages/Firebase/Docs";
import FirebaseLists from "../pages/Firebase/Lists";
import FirebaseMessaging from "../pages/Firebase/Messaging";
import FirebasePaths from "../pages/Firebase/Paths";
import FirebaseStorage from "../pages/Firebase/Storage";
import Dashboard from "../pages/Dashboard";

const routes = [
  {
    path: "/about",
    exact: true,
    element: <About />,
  },
  {
    path: "/dashboard",
    exact: true,
    element: (
      <AuthorizedRoute>
        <Dashboard />
      </AuthorizedRoute>
    ),
  },
  {
    path: "/firebase_paths",
    exact: true,
    element: (
      <AuthorizedRoute>
        <FirebasePaths />
      </AuthorizedRoute>
    ),
  },
  {
    path: "/firebase_lists",
    exact: true,
    element: (
      <AuthorizedRoute>
        <FirebaseLists />
      </AuthorizedRoute>
    ),
  },
  {
    path: "/firebase_docs",
    exact: true,
    element: (
      <AuthorizedRoute>
        <FirebaseDocs />
      </AuthorizedRoute>
    ),
  },
  {
    path: "/firebase_cols",
    exact: true,
    element: (
      <AuthorizedRoute>
        <FirebaseCols />
      </AuthorizedRoute>
    ),
  },
  {
    path: "/admin",
    exact: true,
    element: (
      <AuthorizedRoute>
        <Admin />
      </AuthorizedRoute>
    ),
  },
  {
    path: "/companies",
    exact: true,
    element: (
      <AuthorizedRoute>
        <Companies />
      </AuthorizedRoute>
    ),
  },
  {
    path: "/companies/:uid",
    exact: true,
    element: (
      <AuthorizedRoute>
        <Company />
      </AuthorizedRoute>
    ),
  },
  {
    path: "/create_company",
    exact: true,
    element: (
      <AuthorizedRoute>
        <Company />
      </AuthorizedRoute>
    ),
  },
  {
    path: "/tasks",
    exact: true,
    element: (
      <AuthorizedRoute>
        <Tasks />
      </AuthorizedRoute>
    ),
  },
  {
    path: "/tasks/:uid",
    exact: true,
    element: (
      <AuthorizedRoute>
        <Task />
      </AuthorizedRoute>
    ),
  },
  {
    path: "/create_task",
    exact: true,
    element: (
      <AuthorizedRoute>
        <Task />
      </AuthorizedRoute>
    ),
  },

  {
    path: "/firebase_messaging",
    exact: true,
    element: (
      <AuthorizedRoute>
        <FirebaseMessaging />
      </AuthorizedRoute>
    ),
  },
  {
    path: "/firebase_storage",
    exact: true,
    element: (
      <AuthorizedRoute>
        <FirebaseStorage />
      </AuthorizedRoute>
    ),
  },
];

export default routes;
