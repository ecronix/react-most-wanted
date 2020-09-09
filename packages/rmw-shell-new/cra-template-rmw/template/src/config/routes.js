/* eslint-disable react/jsx-key */
import React, { lazy } from 'react'
import PrivateRoute from 'base-shell/lib/components/PrivateRoute/PrivateRoute'
import PublicRoute from 'base-shell/lib/components/PublicRoute/PublicRoute'
import { Route } from 'react-router-dom'

const SignIn = lazy(() => import('../pages/SignIn/SignIn'))
const About = lazy(() => import('../pages/About/About'))
const Home = lazy(() => import('../pages/Home/Home'))
const Users = lazy(() => import('../pages/Users/Users'))
const FirebasePaths = lazy(() => import('../pages/Firebase/Paths'))

const routes = [
  <Route path="/about" exact component={About} />,
  <PrivateRoute path="/home" exact component={Home} />,
  <PrivateRoute path="/users" exact component={Users} />,
  <PrivateRoute path="/firebase_paths" exact component={FirebasePaths} />,
]

export default routes
