import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../providers/Auth'
import { useConfig } from '../providers/Config'

function UnauthorizedRoute({ children, redirectTo = '/', ...rest }) {
  const { appConfig } = useConfig()
  const { auth: authConfig } = appConfig || {}
  const { redirectTo: _redirectTo = redirectTo } = authConfig || {}
  const { auth } = useAuth()

  if (!auth.isAuthenticated) {
    return children
  } else {
    return <Navigate to={_redirectTo} replace />
  }
}

export default UnauthorizedRoute
