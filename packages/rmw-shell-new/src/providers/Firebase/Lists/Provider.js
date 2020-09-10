import Context from './Context'
import PropTypes from 'prop-types'
import React, { useState, useEffect, useReducer } from 'react'

const LOADING_CHANGED = 'LOADING_CHANGED'
const ERROR = 'ERROR'
const VALUE_CHANGE = 'VALUE_CHANGED'
const CLEAR = 'CLEAR'
const CLEAR_ALL = 'CLEAR_ALL'
const CHILD_ADDED = 'CHILD_ADDED'
const CHILD_CHANGED = 'CHILD_CHANGED'
const CHILD_REMOVED = 'CHILD_REMOVED'

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

const Provider = ({ children, firebaseApp, persistKey = 'firebase_lists' }) => {
  const [state, dispatch] = useReducer(reducer, getInitState(persistKey))
  const [initializations, setInitialized] = useState([])

  console.log('state', state)
  console.log('initializations', initializations)

  const setInit = (path) => {
    setInitialized([...initializations, path])
  }

  const isInit = (path) => {
    return initializations.includes(path)
  }

  const removeInit = (path) => {
    setInitialized(initializations.filter((p) => p !== path))
  }

  useEffect(() => {
    try {
      localStorage.setItem(persistKey, JSON.stringify(state))
    } catch (error) {
      console.warn(error)
    }
  }, [state, persistKey])

  const watchList = async (path) => {
    if (path.length < 1) {
      return
    }

    if (isInit(path)) {
      // we skipp multiple listeners
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

    const handleChange = (s, type) => {
      console.log('child change', type)
      dispatch({
        type,
        path,
        payload: { key: s.key, val: s.val() },
      })
    }

    setInit(path)

    dispatch({
      type: LOADING_CHANGED,
      path,
      isLoading: true,
    })

    const ref = firebaseApp.database().ref(path)

    try {
      const snapshot = await ref.once('value')
      const list = []
      snapshot.forEach((snap) => {
        console.log('snap', snap)
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

    // TO DO: fix initial adding of items even we have all of them with the once call
    ref.on('child_added', (s) => handleChange(s, CHILD_ADDED), handleError)
    ref.on('child_changed', (s) => handleChange(s, CHILD_CHANGED), handleError)
    ref.on('child_removed', (s) => handleChange(s, CHILD_REMOVED), handleError)
  }

  const unwatchList = (path) => {
    if (path.length < 1) {
      return
    }
    firebaseApp.database().ref(path).off()
    removeInit(path)
  }

  const getList = (path) => {
    if (state[path] !== undefined) {
      return state[path].value ? state[path].value : []
    } else {
      return []
    }
  }

  const isListLoading = (path) => {
    if (state[path] !== undefined) {
      return state[path].isLoading
    } else {
      return false
    }
  }

  const getListError = (path) => {
    if (state[path] !== undefined) {
      return state[path].error
    } else {
      return false
    }
  }

  const hasListError = (path) => {
    if (state[path] !== undefined) {
      return state[path].hasError
    } else {
      return false
    }
  }

  const clearList = (path) => {
    unwatchList(path)
    dispatch({ type: CLEAR, path })
  }

  const clearAllLists = () => {
    firebaseApp.database().ref().off()
    dispatch({ type: CLEAR_ALL })
  }

  return (
    <Context.Provider
      value={{
        firebaseApp,
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
