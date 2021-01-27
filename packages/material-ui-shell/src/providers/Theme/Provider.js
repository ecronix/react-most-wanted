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
  const { defaultThemeID, defaultType, defaultIsRTL } = themeConfig || {}
  const [themeID, setThemeID] = useState(defaultThemeID)
  const [type, setType] = useState(defaultType)
  const [isRTL, setIsRTL] = useState(defaultIsRTL)

  const themeIDKey = `${persistKey}:themeID`
  const typeKey = `${persistKey}:type`
  const isRTLKey = `${persistKey}:isRTL`

  const toggleThis = (mode) => {
    if(mode === 'isRTL') setIsRTL(!isRTL)
  }

  useEffect(() => {
    const persistThemeID = localStorage.getItem(themeIDKey)
    const persistType = localStorage.getItem(typeKey)
    const persistIsRTL = localStorage.getItem(isRTLKey)

    if (persistThemeID) {
      setThemeID(persistThemeID)
    }
    if (persistType) {
      setType(persistType)
    }
    if (persistIsRTL) {
      //have to convert the stored string back to boolean
      setIsRTL(persistIsRTL === 'true' ? true : false )
    }
  }, [themeIDKey,typeKey,isRTLKey])

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
      localStorage.setItem(isRTLKey, isRTL)
    } catch (error) {
      console.warn(error)
    }
  }, [isRTL,isRTLKey])

  return (
    <Context.Provider
      value={{
        themeID,
        type,
        setThemeID,
        setType,
        isRTL,
        toggleThis
      }}
    >
    <StylesProvider jss={jss}>
      <div
        style={{
          direction: isRTL ? 'rtl' : 'ltr'
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
