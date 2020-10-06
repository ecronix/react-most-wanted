import PropTypes from 'prop-types'
import React, { useState, useEffect, useReducer } from 'react'
import Context from './Context'

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
  switch (action.type) {
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

const Provider = ({ children, firebaseApp, persistKey = 'firebase_docs' }) => {
  const [state, dispatch] = useReducer(reducer, getInitState(persistKey))
  const [initializations, setInitialized] = useState({})

  const setInit = (path, unsub) => {
    setInitialized({ ...initializations, [path]: unsub })
  }

  const isInit = (path) => {
    return initializations[path] !== undefined
  }

  const removeInit = (path) => {
    const { [path]: initToRemove, ...rest } = initializations
    setInitialized(rest)
  }

  useEffect(() => {
    try {
      localStorage.setItem(persistKey, JSON.stringify(state))
    } catch (error) {
      console.warn(error)
    }
  }, [state, persistKey])

  const getRef = (path) => {
    if (typeof path === 'string' || path instanceof String) {
      return firebaseApp.firestore().doc(path)
    } else {
      return path
    }
  }

  const getLocation = (path) => {
    if (typeof path === 'string' || path instanceof String) {
      return path
    } else {
      return firebaseApp.firestore().doc(path).path
    }
  }

  const watchDoc = (reference, alias) => {
    const ref = getRef(reference)
    const path = alias || getLocation(reference)

    if (path.length < 1) {
      return
    }

    if (isInit(path)) {
      return
    }

    dispatch({
      type: LOADING_CHANGED,
      path,
      isLoading: true,
    })

    let unsub = ref.onSnapshot(
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
  }

  const unwatchDoc = (reference) => {
    const path = getLocation(reference)
    initializations[path] && initializations[path]()
    removeInit(path)
  }

  const getDoc = (path, defaultValue) => {
    return state[path] ? state[path].value : defaultValue
  }

  const isDocLoading = (path) => {
    return state[path] ? state[path].isLoading : false
  }

  const getDocError = (path) => {
    return state[path] ? state[path].error : false
  }

  const hasDocError = (path) => {
    return state[path] ? state[path].hasError : false
  }

  const clearDoc = (reference) => {
    const path = getLocation(reference)
    unwatchDoc(path)
    dispatch({ type: CLEAR, path })
  }

  const clearAllDocs = () => {
    Object.keys(initializations).map((k) => {
      initializations[key].unsub && initializations[key].unsub()
      return k
    })
    dispatch({ type: CLEAR_ALL })
  }

  return (
    <Context.Provider
      value={{
        firebaseApp,
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
  firebaseApp: PropTypes.any,
}

export default Provider
