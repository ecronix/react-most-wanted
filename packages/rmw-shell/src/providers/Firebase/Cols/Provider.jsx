/* eslint-disable default-case */
import Context from './Context'
import React, { useCallback, useEffect, useReducer } from 'react'
import { collection, getFirestore, onSnapshot } from 'firebase/firestore'

const LOADING_CHANGED = 'LOADING_CHANGED'
const ERROR = 'ERROR'
const VALUE_CHANGE = 'VALUE_CHANGED'
const CLEAR = 'CLEAR'
const CLEAR_ALL = 'CLEAR_ALL'
const CHILD_ADDED = 'CHILD_ADDED'
const CHILD_CHANGED = 'CHILD_CHANGED'
const CHILD_REMOVED = 'CHILD_REMOVED'

function list(list = [], action) {
  const { payload, type } = action
  switch (type) {
    case CHILD_ADDED:
      return list.findIndex((d) => d.id === payload.id) === -1
        ? [...list, payload]
        : [...list]

    case CHILD_CHANGED:
      return list.map((child) => (payload.id === child.id ? payload : child))

    case CHILD_REMOVED:
      return list.filter((child) => payload.id !== child.id)
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
        [path]: {
          ...state[path],

          value: list(state[path].value, action),
        },
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

const inits = {}

const setInit = (path, unsub) => {
  inits[path] = unsub
}

const removeInit = (path) => {
  inits[path] = false
}

const getPath = (ref) => {
  return ref.path
}

const getLocation = (path) => {
  if (typeof path === 'string' || path instanceof String) {
    return path
  } else {
    return getPath(path)
  }
}

const unwatchCol = (reference) => {
  const path = getLocation(reference)
  inits[path] && inits[path]()
  removeInit(path)
}

const Provider = ({ children, persistKey = 'firebase_cols' }) => {
  const [state, dispatch] = useReducer(reducer, getInitState(persistKey))
  const db = getFirestore()

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
        return collection(db, path)
      } else {
        return path
      }
    },
    [db]
  )

  const watchCol = useCallback(
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

      const handleChange = (doc, type) => {
        dispatch({
          type,
          path,
          payload: { id: doc.id, data: doc.data() },
        })
      }

      dispatch({
        type: LOADING_CHANGED,
        path,
        isLoading: true,
      })

      try {
        const unsub = onSnapshot(
          ref,
          (snapshot) => {
            setInit(path, unsub)
            dispatch({
              type: LOADING_CHANGED,
              path,
              isLoading: false,
            })

            snapshot.docChanges().forEach((change) => {
              if (change.type === 'added') {
                handleChange(change.doc, CHILD_ADDED)
              }
              if (change.type === 'modified') {
                handleChange(change.doc, CHILD_CHANGED)
              }
              if (change.type === 'removed') {
                handleChange(change.doc, CHILD_REMOVED)
              }
            })
          },
          handleError
        )
      } catch (error) {
        handleError(error)
      }
    },
    [getRef]
  )

  const getCol = useCallback(
    (path) => {
      return state[path] && state[path].value ? state[path].value : []
    },
    [state]
  )

  const isColLoading = useCallback(
    (path) => {
      return state[path] ? state[path].isLoading : false
    },
    [state]
  )

  const getColError = useCallback(
    (path) => {
      return state[path] ? state[path].error : false
    },
    [state]
  )

  const hasColError = useCallback(
    (path) => {
      return state[path] ? state[path].hasError : false
    },
    [state]
  )

  const clearCol = useCallback(
    (reference) => {
      const ref = getRef(reference)
      const path = getLocation(reference)

      unwatchCol(ref)
      dispatch({ type: CLEAR, path })
    },
    [getRef]
  )

  const clearAllCols = useCallback(() => {
    dispatch({ type: CLEAR_ALL })
  }, [])

  return (
    <Context.Provider
      value={{
        watchCol,
        unwatchCol,
        getCol,
        clearCol,
        clearAllCols,
        isColLoading,
        hasColError,
        getColError,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Provider
