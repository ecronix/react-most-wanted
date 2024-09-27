import React, { useState, useEffect } from 'react'
import Context from './Context'

const Provider = ({ children, persistKey = 'theme', appConfig }) => {
  const { theme: themeConfig } = appConfig || {}
  const { defaultThemeID, defaultIsDarkMode, defaultIsRTL } = themeConfig || {}

  const [themeID, setThemeID] = useState(defaultThemeID)
  const [isDarkMode, setIsDarkMode] = useState(defaultIsDarkMode)
  const [isRTL, setIsRTL] = useState(defaultIsRTL)

  const themeIDKey = `${persistKey}:themeID`
  const isDarkModeKey = `${persistKey}:isDarkMode`
  const isRTLKey = `${persistKey}:isRTL`

  const toggleThisTheme = (mode) => {
    if (mode === 'isRTL') setIsRTL(!isRTL)
    if (mode === 'isDarkMode') setIsDarkMode(!isDarkMode)
  }

  useEffect(() => {
    const persistThemeID = localStorage.getItem(themeIDKey)
    const persistIsDarkMode = localStorage.getItem(isDarkModeKey)
    const persistIsRTL = localStorage.getItem(isRTLKey)

    if (persistThemeID) {
      setThemeID(persistThemeID)
    }
    if (persistIsDarkMode) {
      // convert to boolean
      setIsDarkMode(persistIsDarkMode === 'true')
    }
    if (persistIsRTL) {
      //have to convert the stored string back to boolean
      setIsRTL(persistIsRTL === 'true' ? true : false)
    }
  }, [themeIDKey, isDarkModeKey, isRTLKey])

  useEffect(() => {
    try {
      localStorage.setItem(themeIDKey, themeID)
    } catch (error) {
      console.warn(error)
    }
  }, [themeID, themeIDKey])
  useEffect(() => {
    try {
      localStorage.setItem(isDarkModeKey, isDarkMode)
    } catch (error) {
      console.warn(error)
    }
  }, [isDarkMode, isDarkModeKey])

  useEffect(() => {
    try {
      localStorage.setItem(isRTLKey, isRTL)
    } catch (error) {
      console.warn(error)
    }
  }, [isRTL, isRTLKey])

  return (
    <Context.Provider
      value={{
        themeID,
        setThemeID,
        isDarkMode,
        isRTL,
        toggleThisTheme,
      }}
    >
      <div
        style={{
          direction: isRTL ? 'rtl' : 'ltr',
        }}
      >
        {children}
      </div>
    </Context.Provider>
  )
}

export default Provider
