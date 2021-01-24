import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import Context from './Context'

const Provider = ({ children, persistKey = 'theme', appConfig }) => {
  const { theme: themeConfig } = appConfig || {}
  const { defaultThemeID, defaultType, defaultDirection } = themeConfig || {}
  const [themeID, setThemeID] = useState(defaultThemeID)
  const [type, setType] = useState(defaultType)
  const [direction, setDirection] = useState(defaultDirection)//add

  const themeIDKey = `${persistKey}:themeID`
  const typeKey = `${persistKey}:type`
  const directionKey = `${persistKey}:direction`//add

  useEffect(() => {
    const persistThemeID = localStorage.getItem(themeIDKey)
    const persistType = localStorage.getItem(typeKey)
    const persistDirection = localStorage.getItem(directionKey)//add

    if (persistThemeID) {
      setThemeID(persistThemeID)
    }
    if (persistType) {
      setType(persistType)
    }
    if (persistDirection) {
      setDirection(persistDirection)
    }
  }, [themeIDKey,typeKey,directionKey])

  useEffect(() => {
    try {
      localStorage.setItem(themeIDKey, themeID)
    } catch (error) {
      console.warn(error)
    }
  }, [themeID,themeIDKey])

  useEffect(() => {
    try {
      localStorage.setItem(typeKey, type)
    } catch (error) {
      console.warn(error)
    }
  }, [type,typeKey])

  useEffect(() => {
    console.log("In use effect")
    try {
      localStorage.setItem(directionKey, direction)
    } catch (error) {
      console.warn(error)
    }
  }, [direction,directionKey])//add

  return (
    <Context.Provider
      value={{
        themeID,
        type,
        setThemeID,
        setType,
        direction,//add
        setDirection//addd
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
