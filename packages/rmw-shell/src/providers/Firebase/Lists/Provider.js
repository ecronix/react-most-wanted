/* eslint-disable default-case */
import Context from './Context'
import PropTypes from 'prop-types'
import React, { useEffect, useReducer, useCallback } from 'react'
import {
  getDatabase,
  ref,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  get,
  off,
} from 'firebase/database'

const LOADING_CHANGED = 'LOADING_CHANGED'
const ERROR = 'ERROR'
const VALUE_CHANGE = 'VALUE_CHANGED'
const CLEAR = 'CLEAR'
const CLEAR_ALL = 'CLEAR_ALL'
const CHILD_ADDED = 'CHILD_ADDED'
const CHILD_CHANGED = 'CHILD_CHANGED'
const CHILD_REMOVED = 'CHILD_REMOVED'

const inits = {}

const setInit = (path) => {
  inits[path] = true
}

const removeInit = (path) => {
  inits[path] = false
}

function list(list = [], action) {
  const { payload } = action
  switch (action.type) {
    case CHILD_ADDED:
      return list.findIndex((d) => d.key === payload.key) === -1
        ? [...list, payload]
        : [...list]

    case CHILD_CHANGED:
      return list.map((child) => (payload.key === child.key ? payload : child))

    case CHILD_REMOVED:
      return list.filter((child) => payload.key !== child.key)
  }
}

function reducer(state, action) {
  const {
    type,
    path,
    value,
    isLoading = false,
    error = false,
    hasError = false,
  } = action
  switch (type) {
    case LOADING_CHANGED:
      return { ...state, [path]: { ...state[path], isLoading } }
    case ERROR:
      return {
        ...state,
        [path]: { ...state[path], error, hasError, isLoading },
      }
    case VALUE_CHANGE:
      return {
        ...state,
        [path]: { ...state[path], value, isLoading, error, hasError },
      }
    case CLEAR:
      const { [path]: clearedKey, ...rest } = state
      return { ...rest }
    case CHILD_ADDED:
    case CHILD_CHANGED:
    case CHILD_REMOVED:
      return {
        ...state,
        [path]: { ...state[path], value: list(state[path].value, action) },
      }
    case CLEAR_ALL:
      return {}
    default:
      throw new Error()
  }
}

function getInitState(persistKey) {
  let persistedValues = {}
  try {
    persistedValues = JSON.parse(localStorage.getItem(persistKey)) || {}
  } catch (error) {
    console.warn(error)
  }
  return persistedValues
}

const Provider = ({ children, persistKey = 'firebase_lists' }) => {
  const [state, dispatch] = useReducer(reducer, getInitState(persistKey))
  const db = getDatabase()

  useEffect(() => {
    try {
      localStorage.setItem(persistKey, JSON.stringify(state))
    } catch (error) {
      console.warn(error)
    }
  }, [state, persistKey])

  const getRef = useCallback(
    (path) => {
      if (typeof path === 'string' || path instanceof String) {
        return ref(db, path)
      } else {
        return path
      }
    },
    [db]
  )

  const getLocation = useCallback(
    (path) => {
      if (typeof path === 'string' || path instanceof String) {
        return path
      } else {
        return path.toString().substring(ref(db).root.toString().length)
      }
    },
    [db]
  )

  const watchList = useCallback(
    async (reference, alias) => {
      const ref = getRef(reference)
      const path = alias || getLocation(reference)

      if (path.length < 1) {
        return
      }

      if (inits[path]) {
        // we skip multiple listeners
        // only one should be active
        return
      }

      let listenForChanges = false
      // We can't awaid that the single child listeners get calld for every chils
      // but we can use this to not change the state after the inital call
      // because we already have all data we got trough the once call

      const handleError = (error) => {
        dispatch({
          type: ERROR,
          path,
          isLoading: false,
          error,
          hasError: true,
        })
        removeInit(path)
      }

      const handleChange = (s, type) => {
        if (listenForChanges) {
          dispatch({
            type,
            path,
            payload: { key: s.key, val: s.val() },
          })
        }
      }

      setInit(path)

      dispatch({
        type: LOADING_CHANGED,
        path,
        isLoading: true,
      })

      onChildAdded(ref, (s) => handleChange(s, CHILD_ADDED), handleError)
      onChildChanged(ref, (s) => handleChange(s, CHILD_CHANGED), handleError)
      onChildRemoved(ref, (s) => handleChange(s, CHILD_REMOVED), handleError)

      try {
        const snapshot = await get(ref)
        listenForChanges = true
        const list = []
        snapshot.forEach((snap) => {
          list.push({ key: snap.key, val: snap.val() })
        })

        dispatch({
          type: VALUE_CHANGE,
          path,
          value: list,
          isLoading: false,
        })
      } catch (error) {
        handleError(error)
      }
    },
    [getLocation, getRef]
  )

  const unwatchList = useCallback(
    (reference) => {
      const ref = getRef(reference)
      const path = getLocation(reference)

      if (path.length < 1) {
        return
      }
      off(ref)
      removeInit(path)
    },
    [getRef, getLocation]
  )

  const getList = useCallback(
    (path) => {
      return state[path] && state[path].value ? state[path].value : []
    },
    [state]
  )

  const isListLoading = useCallback(
    (path) => {
      return state[path] ? state[path].isLoading : false
    },
    [state]
  )

  const getListError = useCallback(
    (path) => {
      return state[path] ? state[path].error : false
    },
    [state]
  )

  const hasListError = useCallback(
    (path) => {
      return state[path] ? state[path].hasError : false
    },
    [state]
  )

  const clearList = useCallback(
    (reference) => {
      const ref = getRef(reference)
      const path = getLocation(reference)

      unwatchList(ref)
      dispatch({ type: CLEAR, path })
    },
    [getRef, getLocation, unwatchList]
  )

  const clearAllLists = useCallback(() => {
    off(ref(db))
    dispatch({ type: CLEAR_ALL })
  }, [db])

  return (
    <Context.Provider
      value={{
        watchList,
        unwatchList,
        getList,
        clearList,
        clearAllLists,
        isListLoading,
        hasListError,
        getListError,
      }}
    >
      {children}
    </Context.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.any,
}

export default Provider
