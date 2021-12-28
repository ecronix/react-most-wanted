/* eslint-disable react/jsx-key */
import React, { lazy } from 'react'
import AuthorizedRoute from 'base-shell/lib/components/AuthorizedRoute'
import UnauthorizedRoute from 'base-shell/lib/components/UnauthorizedRoute'

const SignIn = lazy(() => import('../pages/SignIn/SignIn'))
const About = lazy(() => import('../pages/About/About'))
const Home = lazy(() => import('../pages/Home/Home'))

const routes = [
  {
    path: '/signin',
    element: (
      <UnauthorizedRoute>
        <SignIn />
      </UnauthorizedRoute>
    ),
  },
  { path: '/about', element: <About /> },
  {
    path: '/home',
    element: (
      <AuthorizedRoute>
        <Home />
      </AuthorizedRoute>
    ),
  },
]

export default routes
