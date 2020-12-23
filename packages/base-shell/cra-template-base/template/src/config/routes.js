/* eslint-disable react/jsx-key */
import React, { lazy } from 'react'
import AuthorizedRoute from 'base-shell/lib/components/AuthorizedRoute/AuthorizedRoute'
import UnauthorizedRoute from 'base-shell/lib/components/UnauthorizedRoute/UnauthorizedRoute'

import { Route } from 'react-router-dom'

const SignIn = lazy(() => import('../pages/SignIn/SignIn'))
const About = lazy(() => import('../pages/About/About'))
const Home = lazy(() => import('../pages/Home/Home'))
const LoaderDemoPage = lazy(() => import('../pages/LoaderDemoPage/LoaderDemoPage'))
const routes = [
  <UnauthorizedRoute path="/signin" exact component={SignIn} />,
  <Route path="/about" exact component={About} />,
  <AuthorizedRoute path="/home" exact component={Home} />,
  <AuthorizedRoute path="/loader_demo_page" exact component={LoaderDemoPage} />,
]

export default routes
