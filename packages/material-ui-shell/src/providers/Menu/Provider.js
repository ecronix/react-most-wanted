import PropTypes from 'prop-types'
import React, { useState, useEffect, useReducer } from 'react'
import Context from './Context'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {
  reducer,
  setMiniMode,
  setMenuOpen,
  setMiniSwitchVisibility } from './action';

const Provider = ({ appConfig, children, persistKey = 'menu' }) => {
  const { menu } = appConfig || {}
  const { useMini = true } = menu || {}

  const [menuStore, dispatch] = useReducer(reducer, {
    miniMode: false,
    menuOpen: true,
    miniSwitchVisibility: true
  })
  const [isAuthMenuOpen, setAuthMenuOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width:600px)')
  const isMenuOpenKey = `${persistKey}:menuOpen`
  const isMiniModeKey = `${persistKey}:miniMode`
  const isMiniSwitchVisibilityKey = `${persistKey}:miniSwitchVisibility`

  useEffect(() => {
    const persistIsMenuOpen = localStorage.getItem(isMenuOpenKey)
    const persistMiniMode = localStorage.getItem(isMiniModeKey)
    const persistMiniSwitchVisibility = localStorage.getItem(isMiniSwitchVisibilityKey)
    if (persistIsMenuOpen) {
      setMenuOpen(dispatch, persistIsMenuOpen === 'true')
    }
    if (persistMiniMode) {
      setMiniMode(dispatch, persistMiniMode === 'true')
    }
    if (persistMiniSwitchVisibility) {
      setMiniSwitchVisibility(dispatch, persistMiniSwitchVisibility === 'true')
    }
  }, [isMenuOpenKey, isMiniModeKey, isMiniSwitchVisibilityKey])
  useEffect(() => {
    try {
      localStorage.setItem(isMenuOpenKey, JSON.stringify(menuStore.menuOpen))
    } catch (error) {
      console.warn(error)
    }
  }, [menuStore, isMenuOpenKey])

  useEffect(() => {
    try {
      localStorage.setItem(isMiniModeKey, JSON.stringify(menuStore.miniMode))
    } catch (error) {
      console.warn(error)
    }
  }, [menuStore, isMiniModeKey])

  useEffect(() => {
    try {
      localStorage.setItem(isMiniSwitchVisibilityKey, JSON.stringify(menuStore.miniSwitchVisibility))
/*       if (!menuStore.miniSwitchVisibility) {
        setMiniSwitchVisibility(dispatch, !menuStore.miniSwitchVisibility)
      } */
    } catch (error) {
      console.warn(error)
    }
  }, [menuStore, isMiniSwitchVisibilityKey])

  return (
    <Context.Provider
      value={{
        isDesktop,
        isAuthMenuOpen,
        setAuthMenuOpen,
        menuStore,
        dispatch,
        setMiniMode,
        setMenuOpen,
        setMiniSwitchVisibility,
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
