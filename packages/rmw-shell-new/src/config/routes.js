import React, { lazy } from 'react'
import { Route } from 'react-router-dom'
import PublicRoute from 'base-shell/lib/components/PublicRoute/PublicRoute'
import PrivateRoute from 'base-shell/lib/components/PrivateRoute/PrivateRoute'

const SignIn = lazy(() => import('../pages/SignIn/SignIn'))
const MyAccount = lazy(() => import('../pages/MyAccount/MyAccount'))
const Users = lazy(() => import('../pages/Users'))

const getDefaultRoutes = (appConfig) => {
  const { pages } = appConfig || {}
  const { PageNotFound = () => <div>Page not found</div> } = pages || {}

  return [
    <PublicRoute path="/signin" redirectTo="/home" exact component={SignIn} />,
    <PrivateRoute path="/my_account" exact component={MyAccount} />,
    <PrivateRoute path="/users" exact component={Users} />,
    <Route component={PageNotFound} />,
  ]
}

export default getDefaultRoutes
