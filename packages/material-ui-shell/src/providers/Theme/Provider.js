import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import Context from './Context'
import { create } from 'jss'
import rtl from 'jss-rtl'
import { StylesProvider, jssPreset } from '@material-ui/core/styles'
// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const Provider = ({ children, persistKey = 'theme', appConfig }) => {
  const { theme: themeConfig } = appConfig || {}
  const { defaultThemeID, defaultType, defaultDirection } = themeConfig || {}
  const [themeID, setThemeID] = useState(defaultThemeID)
  const [type, setType] = useState(defaultType)
  const [direction, setDirection] = useState(defaultDirection)

  const themeIDKey = `${persistKey}:themeID`
  const typeKey = `${persistKey}:type`
  const directionKey = `${persistKey}:direction`

  const toggleRTLmode = () => {
    console.log('Theme Provider direction:', direction)
    if(direction === 'rtl') {
      setDirection('ltr')
    } else if (direction === 'ltr') {
      setDirection('rtl')
    }
  }

  useEffect(() => {
    const persistThemeID = localStorage.getItem(themeIDKey)
    const persistType = localStorage.getItem(typeKey)
    const persistDirection = localStorage.getItem(directionKey)

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
    try {
      localStorage.setItem(directionKey, direction)
    } catch (error) {
      console.warn(error)
    }
  }, [direction,directionKey])

  return (
    <Context.Provider
      value={{
        themeID,
        type,
        setThemeID,
        setType,
        direction,
        setDirection,
        toggleRTLmode
      }}
    >
    <StylesProvider jss={jss}>
      <div
        style={{
          direction: direction
        }}>
        {children}
      </div>
      </StylesProvider>
    </Context.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.any,
}

export default Provider
