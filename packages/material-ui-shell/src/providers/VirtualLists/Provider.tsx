import React, { useReducer } from 'react'
import Context from './Context'

type ReducerAction = {
  type: string
  name: string
  offset: any
}

function reducer(state: any, action: ReducerAction) {
  const { type, name, offset } = action
  switch (type) {
    case 'SET_OFFSET':
      return { ...state, [name]: offset }
    default:
      throw new Error()
  }
}

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {})

  const setOffset = (name: string, offset: any) => {
    dispatch({ type: 'SET_OFFSET', name, offset })
  }

  const getOffset = (name: string) => {
    return state[name] || 0
  }

  return (
    <Context.Provider value={{ setOffset, getOffset }}>
      {children}
    </Context.Provider>
  )
}

export default Provider
