import PropTypes from 'prop-types'
import React from 'react'
import Context from './Context'
import { useDispatch } from 'react-redux'
import { clearInitialization } from 'firekit'
import { initConnection, unsubscribeConnection } from 'firekit'
import { initMessaging, clearMessage } from 'firekit'
import { watchAuth, authStateChanged, authError } from 'firekit'
import { watchCol, unwatchCol, destroyCol, unwatchAllCols } from 'firekit'
import { watchDoc, unwatchDoc, destroyDoc, unwatchAllDocs } from 'firekit'
import { watchList, unwatchList, destroyList, unwatchAllLists } from 'firekit'
import { watchPath, unwatchPath, destroyPath, unwatchAllPaths } from 'firekit'

const Provider = ({ firebaseApp, children }) => {
  const dispatch = useDispatch()

  return (
    <Context.Provider
      value={{
        firebaseApp,
        watchAuth: (onAuthStateChanged, onAuthError) => {
          dispatch(watchAuth(firebaseApp, onAuthStateChanged, onAuthError))
        },
        clearInitialization: () => {
          dispatch(clearInitialization())
        },
        authStateChanged: (user) => {
          dispatch(authStateChanged(user))
        },
        authError: (error) => {
          dispatch(authError(error))
        },
        watchConnection: (onChange) => {
          dispatch(initConnection(firebaseApp, onChange))
        },
        unwatchConnection: () => {
          dispatch(unsubscribeConnection(firebaseApp))
        },
        watchList: (path, alias, append) => {
          dispatch(watchList(firebaseApp, path, alias, append))
        },
        unwatchList: (path, alias) => {
          dispatch(unwatchList(firebaseApp, path, alias))
        },
        destroyList: (path, alias) => {
          dispatch(destroyList(firebaseApp, path, alias))
        },
        unwatchAllLists: () => {
          dispatch(unwatchAllLists(firebaseApp))
        },
        watchCol: (path, alias, append) => {
          dispatch(watchCol(firebaseApp, path, alias, append))
        },
        unwatchCol: (path, alias) => {
          dispatch(unwatchCol(firebaseApp, path, alias))
        },
        destroyCol: (path, alias) => {
          dispatch(destroyCol(firebaseApp, path, alias))
        },
        unwatchAllCols: () => {
          dispatch(unwatchAllCols(firebaseApp))
        },
        watchPath: (path, alias, logLoading) => {
          dispatch(watchPath(firebaseApp, path, alias, logLoading))
        },
        unwatchPath: (path, alias) => {
          dispatch(unwatchPath(firebaseApp, path, alias))
        },
        destroyPath: (path, alias) => {
          dispatch(destroyPath(firebaseApp, path, alias))
        },
        unwatchAllPaths: () => {
          dispatch(unwatchAllPaths(firebaseApp))
        },
        watchDoc: (path, alias) => {
          dispatch(watchDoc(firebaseApp, path, alias))
        },
        unwatchDoc: (path, alias) => {
          dispatch(unwatchDoc(firebaseApp, path, alias))
        },
        destroyDoc: (path, alias) => {
          dispatch(destroyDoc(firebaseApp, path, alias))
        },
        unwatchAllDocs: () => {
          dispatch(unwatchAllDocs(firebaseApp))
        },
        clearApp: () => {
          dispatch(unwatchAllLists(firebaseApp))
          dispatch(unwatchAllPaths(firebaseApp))
          dispatch(unwatchAllDocs(firebaseApp))
          dispatch(unwatchAllCols(firebaseApp))
          dispatch(unsubscribeConnection(firebaseApp))
        },
        initMessaging: (handleTokenChange, onMessageReceieved) => {
          dispatch(
            initMessaging(firebaseApp, handleTokenChange, onMessageReceieved)
          )
        },
      }}
    >
      {children}
    </Context.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.any,
  firebaseApp: PropTypes.any,
}

export default Provider
