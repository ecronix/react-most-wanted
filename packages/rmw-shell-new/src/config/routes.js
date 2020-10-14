import React, { lazy } from 'react'
import { Route } from 'react-router-dom'
import UnauthorizedRoute from 'base-shell/lib/components/UnauthorizedRoute/UnauthorizedRoute'
import AuthorizedRoute from 'base-shell/lib/components/AuthorizedRoute/AuthorizedRoute'

const SignIn = lazy(() => import('../pages/SignIn/SignIn'))
const MyAccount = lazy(() => import('../pages/MyAccount/MyAccount'))
const Users = lazy(() => import('../pages/Users'))
const User = lazy(() => import('../pages/Users/User'))
const Roles = lazy(() => import('../pages/Roles'))
const Role = lazy(() => import('../pages/Roles/Role'))

const getDefaultRoutes = (appConfig) => {
  const { pages } = appConfig || {}
  const { PageNotFound = () => <div>Page not found</div> } = pages || {}

  return [
    <UnauthorizedRoute
      path="/signin"
      redirectTo="/home"
      exact
      component={SignIn}
    />,
    <AuthorizedRoute path="/roles" exact component={Roles} />,
    <AuthorizedRoute path="/create_role" exact component={Role} />,
    <AuthorizedRoute path="/roles/:uid" exact component={Role} />,
    <AuthorizedRoute path="/roles/:uid/:tab" exact component={Role} />,
    <AuthorizedRoute path="/my_account" exact component={MyAccount} />,
    <AuthorizedRoute path="/users" exact component={Users} />,
    <AuthorizedRoute path="/users/:uid" exact component={User} />,
    <AuthorizedRoute path="/users/:uid/:tab" exact component={User} />,

    <Route component={PageNotFound} />,
  ]
}

export default getDefaultRoutes
