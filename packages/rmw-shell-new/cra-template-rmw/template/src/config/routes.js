/* eslint-disable react/jsx-key */
import React, { lazy } from 'react'
import AuthorizedRoute from 'base-shell/lib/components/AuthorizedRoute/AuthorizedRoute'
import UnauthorizedRoute from 'base-shell/lib/components/UnauthorizedRoute/UnauthorizedRoute'
import { Route } from 'react-router-dom'

const About = lazy(() => import('../pages/About/About'))
const Home = lazy(() => import('../pages/Home/Home'))
const FirebasePaths = lazy(() => import('../pages/Firebase/Paths'))
const FirebaseLists = lazy(() => import('../pages/Firebase/Lists'))
const FirebaseDocs = lazy(() => import('../pages/Firebase/Docs'))
const FirebaseCols = lazy(() => import('../pages/Firebase/Cols'))
const FirebaseMessaging = lazy(() => import('../pages/Firebase/Messaging'))
const FirebaseStorage = lazy(() => import('../pages/Firebase/Storage'))

const routes = [
  <Route path="/about" exact component={About} />,
  <AuthorizedRoute path="/home" exact component={Home} />,
  <AuthorizedRoute path="/firebase_paths" exact component={FirebasePaths} />,
  <AuthorizedRoute path="/firebase_lists" exact component={FirebaseLists} />,
  <AuthorizedRoute path="/firebase_docs" exact component={FirebaseDocs} />,
  <AuthorizedRoute path="/firebase_cols" exact component={FirebaseCols} />,
  <AuthorizedRoute
    path="/firebase_messaging"
    exact
    component={FirebaseMessaging}
  />,
  <AuthorizedRoute path="/firebase_storage" exact component={FirebaseStorage} />,
]

export default routes
