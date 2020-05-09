import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import Context from './Context'

const Provider = ({ children, persistKey = 'menu' }) => {
  const [isDesktopOpen, setDesktopOpen] = useState(true)
  const [isMobileOpen, setMobileOpen] = useState(false)
  const [isMini, setMini] = useState(false)

  useEffect(() => {
    const persistDesktopOpen = localStorage.getItem(persistKey)
    if (persistDesktopOpen) {
      setDesktopOpen(persistDesktopOpen === 'true')
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(persistKey, isDesktopOpen)
    } catch (error) {
      console.warn(error)
    }
  }, [isDesktopOpen])

  return (
    <Context.Provider
      value={{
        isDesktopOpen,
        isMobileOpen,
        setDesktopOpen,
        setDesktopOpen,
        setMobileOpen,
        isMini,
        setMini,
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
