import React, { useReducer } from 'react'
import Context from './Context'

function reducer(state, action) {
  const { type, name, offset } = action
  switch (type) {
    case 'SET_OFFSET':
      return { ...state, [name]: offset }
    default:
      throw new Error()
  }
}

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {})

  const setOffset = (name, offset) => {
    dispatch({ type: 'SET_OFFSET', name, offset })
  }

  const getOffset = (name) => {
    return state[name] || 0
  }

  return (
    <Context.Provider value={{ setOffset, getOffset }}>
      {children}
    </Context.Provider>
  )
}

export default Provider
