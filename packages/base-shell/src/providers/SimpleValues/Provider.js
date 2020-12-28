import PropTypes from 'prop-types'
import React, {  useEffect, useReducer } from 'react'
import Context from './Context'

function reducer(state, action) {
  const { type, key, value, persist } = action
  switch (type) {
    case 'add':
      return { ...state, [key]: { value, persist } }
    case 'clear':
      const { [key]: clearedKey, ...rest } = state
      return { ...rest }
    case 'clear_all':
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

const Provider = ({ children, persistKey = 'simple_values' }) => {
  const [state, dispatch] = useReducer(reducer, getInitState(persistKey))

  useEffect(() => {
    try {
      const persistValues = {}

      Object.keys(state).map((k) => {
        if (state[k].persist) {
          persistValues[k] = { value: state[k].value, persist: true }
        }

        return k
      })

      localStorage.setItem(persistKey, JSON.stringify(persistValues))
    } catch (error) {
      console.warn(error)
    }
  }, [state, persistKey])

  const setValue = (key, value, persist = false) => {
    dispatch({ type: 'add', key, value, persist })
  }

  const getValue = (key, defaultValue) => {
    if (state[key] !== undefined) {
      return state[key].value
    } else {
      return defaultValue
    }
  }

  const clearValue = (key) => {
    dispatch({ type: 'clear', key })
  }

  const clearAll = () => {
    dispatch({ type: 'clear_all' })
  }

  return (
    <Context.Provider value={{ setValue, getValue, clearValue, clearAll }}>
      {children}
    </Context.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.any,
}

export default Provider
