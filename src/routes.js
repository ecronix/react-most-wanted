import React from 'react'
import makeLoadable from 'rmw-shell/lib/containers/MyLoadable'
import makeSlimLoadable from 'rmw-shell/lib/containers/SlimLoadable'
import RestrictedRoute from 'rmw-shell/lib/containers/RestrictedRoute'
import { Route } from 'react-router-dom'

const MyLoadable = (opts, preloadComponents) => makeLoadable({ ...opts, firebase: () => import('./firebase') }, preloadComponents)
const SlimLoadable = (opts) => makeSlimLoadable({ ...opts })


const AsyncDashboard = MyLoadable({ loader: () => import('./containers/Dashboard/Dashboard') });
const AsyncAbout = MyLoadable({ loader: () => import('./containers/About/About') });
const AsyncCompany = MyLoadable({ loader: () => import('./containers/Companies/Company') });
const AsyncCompanies = MyLoadable({ loader: () => import('./containers/Companies/Companies') }, [AsyncCompany]);
const AsyncTask = MyLoadable({ loader: () => import('./containers/Tasks/Task') });
const AsyncTasks = MyLoadable({ loader: () => import('./containers/Tasks/Tasks') }, [AsyncTask]);
const AsyncDocument = MyLoadable({ loader: () => import('./containers/Document/Document') });
const AsyncCollection = MyLoadable({ loader: () => import('./containers/Collection/Collection') });
const AsyncLandingPage = SlimLoadable({ loader: () => import('./containers/LandingPage/LandingPage') });

const routes = [
  <Route path="/" exact component={AsyncLandingPage} />,
  <RestrictedRoute type='private' path="/" exact component={AsyncAbout} />,
  <RestrictedRoute type='private' path="/dashboard" exact component={AsyncDashboard} />,
  <RestrictedRoute path="/about" exact component={AsyncAbout} />,
  <RestrictedRoute type='private' path="/companies" exact component={AsyncCompanies} />,
  <RestrictedRoute type='private' path="/companies/edit/:uid" exact component={AsyncCompany} />,
  <RestrictedRoute type='private' path="/companies/create" exact component={AsyncCompany} />,
  <RestrictedRoute type='private' path="/tasks" exact component={AsyncTasks} />,
  <RestrictedRoute type='private' path="/tasks/edit/:uid" exact component={AsyncTask} />,
  <RestrictedRoute type='private' path="/document" exact component={AsyncDocument} />,
  <RestrictedRoute type='private' path="/collection" exact component={AsyncCollection} />,
]


export default routes;