import React, { useEffect, useReducer } from 'react'
import Context from './Context'

function reducer(state, action) {
  const { type, auth } = action
  switch (type) {
    case 'SET_AUTH':
      return auth
    case 'UPDATE_AUTH':
      return { ...state, ...auth }
    default:
      throw new Error()
  }
}

const Provider = ({ persistKey = 'auth', children }) => {
  const persistAuth = JSON.parse(localStorage.getItem(persistKey))

  const [auth, dispatch] = useReducer(reducer, persistAuth || {})

  useEffect(() => {
    try {
      localStorage.setItem(persistKey, JSON.stringify(auth))
    } catch (error) {
      console.warn(error)
    }
  }, [auth, persistKey])

  const setAuth = (auth) => {
    dispatch({ type: 'SET_AUTH', auth })
  }

  const updateAuth = (auth) => {
    dispatch({ type: 'UPDATE_AUTH', auth })
  }

  return (
    <Context.Provider value={{ auth, setAuth, updateAuth }}>
      {children}
    </Context.Provider>
  )
}

export default Provider
