import AuthorizedRoute from 'base-shell/lib/components/AuthorizedRoute/AuthorizedRoute'
import React, { lazy } from 'react'
import UnauthorizedRoute from 'base-shell/lib/components/UnauthorizedRoute/UnauthorizedRoute'
import { Route } from 'react-router-dom'

const SignIn = lazy(() => import('rmw-shell/lib/pages/SignIn/SignIn'))
const MyAccount = lazy(() => import('rmw-shell/lib/pages/MyAccount/MyAccount'))
const Users = lazy(() => import('rmw-shell/lib/pages/Users'))
const User = lazy(() => import('rmw-shell/lib/pages/Users/User'))
const Roles = lazy(() => import('rmw-shell/lib/pages/Roles'))
const Role = lazy(() => import('rmw-shell/lib/pages/Roles/Role'))
const Chats = lazy(() => import('rmw-shell/lib/pages/Chats'))
const CreateChat = lazy(() => import('rmw-shell/lib/pages/CreateChat'))
const GroupChat = lazy(() => import('rmw-shell/lib/pages/GroupChat'))
const EditMembers = lazy(() => import('rmw-shell/lib/pages/EditMembers'))
const EditAdmins = lazy(() => import('rmw-shell/lib/pages/EditAdmins'))

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
    <AuthorizedRoute path="/create_chat" exact component={CreateChat} />,
    <AuthorizedRoute path="/edit_members/:uid" exact component={EditMembers} />,
    <AuthorizedRoute path="/edit_admins/:uid" exact component={EditAdmins} />,
    <AuthorizedRoute path="/group_chat" exact component={GroupChat} />,
    <AuthorizedRoute path="/group_chat/:uid" exact component={GroupChat} />,
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
