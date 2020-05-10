import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import Context from './Context'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const Provider = ({ children, persistKey = 'menu' }) => {
  const [isDesktopOpen, setDesktopOpen] = useState(true)
  const [isMobileOpen, setMobileOpen] = useState(false)
  const [isMini, setMini] = useState(false)
  const isDesktop = useMediaQuery('(min-width:600px)')
  const isDesktopKey = `${persistKey}:isDesktopOpen`
  const isMiniKey = `${persistKey}:isMini`

  useEffect(() => {
    const persistDesktopOpen = localStorage.getItem(isDesktopKey)
    const persistMini = localStorage.getItem(isMiniKey)
    if (persistDesktopOpen) {
      setDesktopOpen(persistDesktopOpen === 'true')
    }
    if (persistMini) {
      setMini(persistMini === 'true')
    }
  }, [isDesktopKey, isMiniKey])

  useEffect(() => {
    try {
      localStorage.setItem(isDesktopKey, JSON.stringify(isDesktopOpen))
    } catch (error) {
      console.warn(error)
    }
  }, [isDesktopOpen, isDesktopKey])

  useEffect(() => {
    try {
      localStorage.setItem(isMiniKey, JSON.stringify(isMini))
    } catch (error) {
      console.warn(error)
    }
  }, [isMini, isMiniKey])

  return (
    <Context.Provider
      value={{
        isDesktop,
        isDesktopOpen,
        isMobileOpen,
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
