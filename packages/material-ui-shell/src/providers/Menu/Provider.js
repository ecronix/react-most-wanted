import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import Context from './Context'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const Provider = ({ appConfig, children, persistKey = 'menu' }) => {
  const { menu } = appConfig || {}
  const { useMini = true } = menu || {}
  const [isDesktopOpen, setDesktopOpen] = useState(false)
  const [isMobileOpen, setMobileOpen] = useState(false)
  const [useMiniMode, setMiniMode] = useState(useMini)
  const [isAuthMenuOpen, setAuthMenuOpen] = useState(false)
  const [isMini, setMini] = useState(true)
  const isDesktop = useMediaQuery('(min-width:600px)')
  const isDesktopKey = `${persistKey}:isDesktopOpen`
  const isMiniKey = `${persistKey}:isMini`
  const isUseMiniModeKey = `${persistKey}:isUseMiniModeKey`

  const toggleMenuState = (setTo) => {
    setDesktopOpen((typeof setTo === "boolean") ? setTo : !isDesktopOpen)
    setMobileOpen((typeof setTo === "boolean") ? setTo : !isMobileOpen)
  }
  function debounce(callback, ms) {
    let timer
    return () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        callback.apply(this, arguments)
      }, ms)
    }
  }
  useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      if(!isDesktop) {
        toggleMenuState(false)
        setMini(false)
      }
    }, 1000)
    window.addEventListener('resize', debouncedHandleResize)
    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  })

  useEffect(() => {
    const persistDesktopOpen = localStorage.getItem(isDesktopKey)
    const persistMini = localStorage.getItem(isMiniKey)
    const persistMiniMode = localStorage.getItem(isUseMiniModeKey)
    if (persistDesktopOpen) {
      setDesktopOpen(persistDesktopOpen === 'true')
    }
    if (persistMini) {
      setMini(persistMini === 'true')
    }
    if (persistMiniMode) {
      setMiniMode(persistMiniMode === 'true')
    }
  }, [isDesktopKey, isMiniKey, isUseMiniModeKey])

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

  useEffect(() => {
    try {
      localStorage.setItem(isUseMiniModeKey, JSON.stringify(useMiniMode))
      if (!useMiniMode) {
        setMini(useMiniMode)
      }
    } catch (error) {
      console.warn(error)
    }
  }, [useMiniMode, isUseMiniModeKey])

  return (
    <Context.Provider
      value={{
        isDesktop,
        isDesktopOpen,
        isMobileOpen,
        setDesktopOpen,
        setMobileOpen,
        isAuthMenuOpen,
        setAuthMenuOpen,
        isMini,
        setMini,
        useMiniMode,
        setMiniMode,
        toggleMenuState,
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
