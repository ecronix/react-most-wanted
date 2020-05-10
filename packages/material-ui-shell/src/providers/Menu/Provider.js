import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import Context from './Context'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const Provider = ({ children, persistKey = 'menu' }) => {
  const [isDesktopOpen, setDesktopOpen] = useState(false)
  const [isMobileOpen, setMobileOpen] = useState(false)
  const [isMini, setMini] = useState(false)
  const isDesktop = useMediaQuery('(min-width:600px)')

  function getPersist() {
    let persistMenu = JSON.parse(localStorage.getItem(persistKey))
    return persistMenu
  }
  function savePersist(persistMenu) {
    localStorage.setItem(persistKey, JSON.stringify(persistMenu))
  }
  useEffect(() => {
    let persistMenu = getPersist()
    if (persistMenu) {
      setDesktopOpen(persistMenu.isDesktopOpen === 'true')
      setMobileOpen(persistMenu.isMobileOpen === 'true')
      setMini(persistMenu.isMini === 'true')
    } else {
      persistMenu = { ...{ isDesktopOpen, isMobileOpen, isMini } }
      savePersist(persistMenu)
    }
  }, [persistKey])

  useEffect(() => {
    try {
      let persistMenu = getPersist()
      persistMenu.isDesktopOpen = isDesktopOpen
      savePersist(persistMenu)
    } catch (error) {
      console.warn(error)
    }
  }, [isDesktopOpen, persistKey])

  useEffect(() => {
    try {
      let persistMenu = getPersist()
      persistMenu.isMini = isMini
      savePersist(persistMenu)
    } catch (error) {
      console.warn(error)
    }
  }, [isMini, persistKey])

  useEffect(() => {
    try {
      let persistMenu = getPersist()
      persistMenu.isMobileOpen = isMobileOpen
      savePersist(persistMenu)
    } catch (error) {
      console.warn(error)
    }
  }, [isMobileOpen, persistKey])

  return (
    <Context.Provider
      value={{
        isDesktop,
        isDesktopOpen,
        setDesktopOpen,
        isMobileOpen,
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
