import PropTypes from 'prop-types'
import React, { useEffect, useReducer, useCallback } from 'react'
import Context from './Context'
import { doc, onSnapshot, getFirestore } from 'firebase/firestore'

const LOADING_CHANGED = 'LOADING_CHANGED'
const ERROR = 'ERROR'
const VALUE_CHANGE = 'VALUE_CHANGED'
const CLEAR = 'CLEAR'
const CLEAR_ALL = 'CLEAR_ALL'

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

const Provider = ({ children, persistKey = 'firebase_docs' }) => {
  const [state, dispatch] = useReducer(reducer, getInitState(persistKey))

  useEffect(() => {
    try {
      localStorage.setItem(persistKey, JSON.stringify(state))
    } catch (error) {
      console.warn(error)
    }
  }, [state, persistKey])

  const getRef = useCallback((path) => {
    const db = getFirestore()
    if (typeof path === 'string' || path instanceof String) {
      return doc(db, ...path.split('/'))
    } else if (path instanceof Array) {
      return doc(db, ...path)
    } else {
      return path
    }
  }, [])

  const getLocation = useCallback((path) => {
    if (typeof path === 'string' || path instanceof String) {
      return path
    } else if (path instanceof Array) {
      return path.join('/')
    } else {
      return doc(path).path
    }
  }, [])

  const watchDoc = useCallback(
    (reference, alias) => {
      const ref = getRef(reference)
      const path = alias || getLocation(reference)

      if (path.length < 1) {
        return
      }

      if (inits[path]) {
        return
      }

      dispatch({
        type: LOADING_CHANGED,
        path,
        isLoading: true,
      })

      let unsub = onSnapshot(
        ref,
        (snapshot) => {
          dispatch({
            type: VALUE_CHANGE,
            path,
            value: snapshot.data(),
            isLoading: false,
          })
        },
        (error) => {
          dispatch({
            type: ERROR,
            path,
            isLoading: false,
            error,
            hasError: true,
          })
        }
      )
      setInit(path, unsub)
    },
    [getLocation, getRef]
  )

  const unwatchDoc = useCallback(
    (reference) => {
      const path = getLocation(reference)
      inits[path] && inits[path]()
      removeInit(path)
    },
    [getLocation]
  )

  const getDoc = useCallback(
    (path, defaultValue) => {
      return state[path] ? state[path].value : defaultValue
    },
    [state]
  )

  const isDocLoading = useCallback(
    (path) => {
      return state[path] ? state[path].isLoading : false
    },
    [state]
  )

  const getDocError = useCallback(
    (path) => {
      return state[path] ? state[path].error : false
    },
    [state]
  )

  const hasDocError = useCallback(
    (path) => {
      return state[path] ? state[path].hasError : false
    },
    [state]
  )

  const clearDoc = useCallback(
    (reference) => {
      const path = getLocation(reference)
      unwatchDoc(path)
      dispatch({ type: CLEAR, path })
    },
    [getLocation, unwatchDoc]
  )

  const clearAllDocs = useCallback(() => {
    Object.keys(inits).map((k) => {
      inits[k].unsub && inits[k].unsub()
      return k
    })
    dispatch({ type: CLEAR_ALL })
  }, [])

  return (
    <Context.Provider
      value={{
        watchDoc,
        unwatchDoc,
        getDoc,
        clearDoc,
        clearAllDocs,
        isDocLoading,
        hasDocError,
        getDocError,
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
