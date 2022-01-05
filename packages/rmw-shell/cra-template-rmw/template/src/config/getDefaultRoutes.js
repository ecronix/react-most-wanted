import AuthorizedRoute from 'base-shell/lib/components/AuthorizedRoute'
import React, { lazy } from 'react'
import UnauthorizedRoute from 'base-shell/lib/components/UnauthorizedRoute'

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
const PageNotFound = lazy(() => import('../pages/PageNotFound'))

const getDefaultRoutes = (appConfig) => {
  return [
    {
      path: '/signin',
      exact: true,
      element: (
        <UnauthorizedRoute>
          <SignIn redirectTo={appConfig?.auth?.redirectTo || '/'} />
        </UnauthorizedRoute>
      ),
    },

    {
      path: '/chats',
      exact: true,
      element: (
        <AuthorizedRoute>
          <Chats />
        </AuthorizedRoute>
      ),
    },
    {
      path: '/chats/:uid',
      exact: true,
      element: (
        <AuthorizedRoute>
          <Chats />
        </AuthorizedRoute>
      ),
    },
    {
      path: '/create_chat',
      exact: true,
      element: (
        <AuthorizedRoute>
          <CreateChat />
        </AuthorizedRoute>
      ),
    },
    {
      path: '/edit_members/:uid',
      exact: true,
      element: (
        <AuthorizedRoute>
          <EditMembers />
        </AuthorizedRoute>
      ),
    },
    {
      path: '/edit_admins/:uid',
      exact: true,
      element: (
        <AuthorizedRoute>
          <EditAdmins />
        </AuthorizedRoute>
      ),
    },
    {
      path: '/group_chat',
      exact: true,
      element: (
        <AuthorizedRoute>
          <GroupChat />
        </AuthorizedRoute>
      ),
    },
    {
      path: '/group_chat/:uid',
      exact: true,
      element: (
        <AuthorizedRoute>
          <GroupChat />
        </AuthorizedRoute>
      ),
    },
    {
      path: '/roles',
      exact: true,
      element: (
        <AuthorizedRoute>
          <Roles />
        </AuthorizedRoute>
      ),
    },
    {
      path: '/create_role',
      exact: true,
      element: (
        <AuthorizedRoute>
          <Role />
        </AuthorizedRoute>
      ),
    },
    {
      path: '/roles/:uid',
      exact: true,
      element: (
        <AuthorizedRoute>
          <Role />
        </AuthorizedRoute>
      ),
    },
    {
      path: '/roles/:uid/:tab',
      exact: true,
      element: (
        <AuthorizedRoute>
          <Role />
        </AuthorizedRoute>
      ),
    },
    {
      path: '/my_account',
      exact: true,
      element: (
        <AuthorizedRoute>
          <MyAccount />
        </AuthorizedRoute>
      ),
    },
    {
      path: '/users',
      exact: true,
      element: (
        <AuthorizedRoute>
          <Users />
        </AuthorizedRoute>
      ),
    },
    {
      path: '/users/:uid',
      exact: true,
      element: (
        <AuthorizedRoute>
          <User />
        </AuthorizedRoute>
      ),
    },
    {
      path: '/users/:uid/:tab',
      exact: true,
      element: (
        <AuthorizedRoute>
          <User />
        </AuthorizedRoute>
      ),
    },
    {
      path: '*',

      element: (
        <AuthorizedRoute>
          <PageNotFound />
        </AuthorizedRoute>
      ),
    },
  ]
}

export { getDefaultRoutes }
