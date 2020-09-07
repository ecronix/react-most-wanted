import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import Context from './Context'

const Provider = ({ children, persistKey = 'simple_values' }) => {
  let persistedValues = {}
  try {
    persistedValues = JSON.parse(localStorage.getItem(persistKey))
  } catch (error) {
    console.warn(error)
  }

  const [values, setValues] = useState(persistedValues || {})

  useEffect(() => {
    try {
      const persistValues = {}

      Object.keys(values).map((k) => {
        if (values[k].persist) {
          persistValues[k] = { value: values[k].value, persist: true }
        }

        return k
      })

      localStorage.setItem(persistKey, JSON.stringify(persistValues))
    } catch (error) {
      console.warn(error)
    }
  }, [values, persistKey])

  const setValue = (key, value, persist = false) => {
    setValues({ ...values, [key]: { value, persist } })
  }

  const getValue = (key, defaultValue) => {
    if (values[key] !== undefined) {
      return values[key].value
    } else {
      return defaultValue
    }
  }

  const clearValue = (key) => {
    const { [key]: valueToRemove, ...rest } = values

    setValues(rest)
  }

  return (
    <Context.Provider value={{ setValue, getValue, clearValue }}>
      {children}
    </Context.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.any,
}

export default Provider
