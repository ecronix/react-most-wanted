/* eslint-disable react/jsx-key */
import React, { lazy } from 'react'
import { AuthorizedRoute, UnauthorizedRoute } from '@ecronix/base-shell'
import { SignInPage } from '../pages/SignIn'
import { SignUpPage } from '../pages/SignUp'
import { PasswordResetPage } from '../pages/PasswordReset'
import { AboutPage } from '../pages/About'
import { MyAccountPage } from '../pages/MyAccount'
import { HomePage } from '../pages/Home'
import { DialogDemoPage } from '../pages/DialogDemo'
import { ToastDemoPage } from '../pages/ToastDemo'
import { FilterDemoPage } from '../pages/FilterDemo'
import { ListPageDemoPage } from '../pages/ListPageDemo'
import { TabsDemoPage } from '../pages/TabsDemo'

const routes = [
  {
    path: '/signin',
    exact: true,
    element: (
      <UnauthorizedRoute>
        <SignInPage redirectTo="/home" />
      </UnauthorizedRoute>
    ),
  },
  {
    path: '/signup',
    exact: true,
    element: (
      <UnauthorizedRoute>
        <SignUpPage redirectTo="/home" />
      </UnauthorizedRoute>
    ),
  },
  {
    path: '/password_reset',
    exact: true,
    element: (
      <UnauthorizedRoute>
        <PasswordResetPage redirectTo="/home" />
      </UnauthorizedRoute>
    ),
  },
  {
    path: '/about',
    exact: true,
    element: <AboutPage />,
  },
  {
    path: '/my_account',
    exact: true,
    element: (
      <AuthorizedRoute>
        <MyAccountPage />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/home',
    exact: true,
    element: (
      <AuthorizedRoute>
        <HomePage />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/dialog_demo',
    exact: true,
    element: (
      <AuthorizedRoute>
        <DialogDemoPage />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/toast_demo',
    exact: true,
    element: (
      <AuthorizedRoute>
        <ToastDemoPage />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/filter_demo',
    exact: true,
    element: (
      <AuthorizedRoute>
        <FilterDemoPage />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/list_page_demo',
    exact: true,
    element: (
      <AuthorizedRoute>
        <ListPageDemoPage />
      </AuthorizedRoute>
    ),
  },
  {
    path: '/tabs_demo',
    exact: true,
    element: (
      <AuthorizedRoute>
        <TabsDemoPage />
      </AuthorizedRoute>
    ),
  },
]

export default routes
