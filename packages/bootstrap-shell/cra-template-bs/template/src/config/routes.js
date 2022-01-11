/* eslint-disable react/jsx-key */
import React, { lazy } from 'react'
//import AuthorizedRoute from 'base-shell/lib/components/AuthorizedRoute'
//import UnauthorizedRoute from 'base-shell/lib/components/UnauthorizedRoute'

const Home = lazy(() => import('../pages/Home/Home'))
const routes = [
    {
        generateHeaderLink: true,
        displayName: "Home",
        path: '#home',
        exact: true,
        element: <Home redirectTo="#home" />
    },
    {
        generateHeaderLink: true,
        displayName: "Second",
        path: '#home',
        exact: true,
        element: <Home redirectTo="#home" />
    },
    {
        generateHeaderLink: true,
        displayName: "Third",
        path: '#home',
        exact: true,
        element: <Home redirectTo="#home" />
    },
]

export default routes
