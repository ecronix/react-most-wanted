/* eslint-disable react/jsx-key */
import AuthorizedRoute from 'base-shell/lib/components/AuthorizedRoute/AuthorizedRoute'
import React, { lazy } from 'react'
import { Route } from 'react-router-dom'

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
  <Route path="/about" exact component={About} />,
  <AuthorizedRoute path="/dashboard" exact component={Dashboard} />,
  <AuthorizedRoute path="/firebase_paths" exact component={FirebasePaths} />,
  <AuthorizedRoute path="/firebase_lists" exact component={FirebaseLists} />,
  <AuthorizedRoute path="/firebase_docs" exact component={FirebaseDocs} />,
  <AuthorizedRoute path="/firebase_cols" exact component={FirebaseCols} />,
  <AuthorizedRoute path="/admin" exact component={Admin} />,
  <AuthorizedRoute path="/companies" exact component={Companies} />,
  <AuthorizedRoute path="/companies/:uid" exact component={Company} />,
  <AuthorizedRoute path="/create_company" exact component={Company} />,
  <AuthorizedRoute path="/tasks" exact component={Tasks} />,
  <AuthorizedRoute path="/tasks/:uid" exact component={Task} />,
  <AuthorizedRoute path="/create_task" exact component={Task} />,
  <AuthorizedRoute
    path="/firebase_messaging"
    exact
    component={FirebaseMessaging}
  />,
  <AuthorizedRoute
    path="/firebase_storage"
    exact
    component={FirebaseStorage}
  />,
]

export default routes
