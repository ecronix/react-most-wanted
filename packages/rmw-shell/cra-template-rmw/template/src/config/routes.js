/* eslint-disable react/jsx-key */
import AuthorizedRoute from 'base-shell/lib/components/AuthorizedRoute'
import React, { lazy } from 'react'

const About = lazy(() => import('../pages/About'))
const Admin = lazy(() => import('../pages/Demo/Admin'))
const Companies = lazy(() => import('../pages/Demo/Companies'))
const Company = lazy(() => import('../pages/Demo/Companies/Company'))
const Tasks = lazy(() => import('../pages/Demo/Tasks'))
const Task = lazy(() => import('../pages/Demo/Tasks/Task'))
const FirebaseCols = lazy(() => import('../pages/Firebase/Cols'))
const FirebaseDocs = lazy(() => import('../pages/Firebase/Docs'))
const FirebaseLists = lazy(() => import('../pages/Firebase/Lists'))
const FirebaseMessaging = lazy(() => import('../pages/Firebase/Messaging'))
const FirebasePaths = lazy(() => import('../pages/Firebase/Paths'))
const FirebaseStorage = lazy(() => import('../pages/Firebase/Storage'))
const Dashboard = lazy(() => import('../pages/Dashboard'))

const routes = [
  {
    path: '/about',
    exact: true,
    element: <About />,
  },
  {
    path: '/dashboard',
    exact: true,
    element: (
      <AuthorizedRoute>
        <Dashboard />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/firebase_paths',
    exact: true,
    element: (
      <AuthorizedRoute>
        <FirebasePaths />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/firebase_lists',
    exact: true,
    element: (
      <AuthorizedRoute>
        <FirebaseLists />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/firebase_docs',
    exact: true,
    element: (
      <AuthorizedRoute>
        <FirebaseDocs />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/firebase_cols',
    exact: true,
    element: (
      <AuthorizedRoute>
        <FirebaseCols />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/admin',
    exact: true,
    element: (
      <AuthorizedRoute>
        <Admin />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/companies',
    exact: true,
    element: (
      <AuthorizedRoute>
        <Companies />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/companies/:uid',
    exact: true,
    element: (
      <AuthorizedRoute>
        <Company />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/create_company',
    exact: true,
    element: (
      <AuthorizedRoute>
        <Company />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/tasks',
    exact: true,
    element: (
      <AuthorizedRoute>
        <Tasks />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/tasks/:uid',
    exact: true,
    element: (
      <AuthorizedRoute>
        <Task />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/create_task',
    exact: true,
    element: (
      <AuthorizedRoute>
        <Task />
      </AuthorizedRoute>
    ),
  },

  {
    path: '/firebase_messaging',
    exact: true,
    element: (
      <AuthorizedRoute>
        <FirebaseMessaging />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/firebase_storage',
    exact: true,
    element: (
      <AuthorizedRoute>
        <FirebaseStorage />
      </AuthorizedRoute>
    ),
  },
]

export default routes
