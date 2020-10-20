import AuthorizedRoute from 'base-shell/lib/components/AuthorizedRoute/AuthorizedRoute'
import React, { lazy } from 'react'
import UnauthorizedRoute from 'base-shell/lib/components/UnauthorizedRoute/UnauthorizedRoute'
import { Route } from 'react-router-dom'

const SignIn = lazy(() => import('../pages/SignIn/SignIn'))
const MyAccount = lazy(() => import('../pages/MyAccount/MyAccount'))
const Users = lazy(() => import('../pages/Users'))
const User = lazy(() => import('../pages/Users/User'))
const Roles = lazy(() => import('../pages/Roles'))
const Role = lazy(() => import('../pages/Roles/Role'))
const Chats = lazy(() => import('../pages/Chats'))

const getDefaultRoutes = (appConfig) => {
  return [
    <UnauthorizedRoute
      path="/signin"
      redirectTo={appConfig?.auth?.redirectTo || '/'}
      exact
      component={SignIn}
    />,
    <AuthorizedRoute path="/chats" exact component={Chats} />,
    <AuthorizedRoute path="/chats/:uid" exact component={Chats} />,
    <AuthorizedRoute path="/roles" exact component={Roles} />,
    <AuthorizedRoute path="/create_role" exact component={Role} />,
    <AuthorizedRoute path="/roles/:uid" exact component={Role} />,
    <AuthorizedRoute path="/roles/:uid/:tab" exact component={Role} />,
    <AuthorizedRoute path="/my_account" exact component={MyAccount} />,
    <AuthorizedRoute path="/users" exact component={Users} />,
    <AuthorizedRoute path="/users/:uid" exact component={User} />,
    <AuthorizedRoute path="/users/:uid/:tab" exact component={User} />,

    <Route component={appConfig?.pages?.PageNotFound} />,
  ]
}

export default getDefaultRoutes
