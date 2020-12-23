import PropTypes from 'prop-types'
import React, { useState, useEffect, useReducer } from 'react'
import Context from './Context'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {
  setMiniMode,
  setMenuOpen,
  setMobileMenuOpen,
  setMiniSwitchVisibility
} from './store/actions'
import reducer from './store/reducer'


const Provider = ({ appConfig, children, persistKey = 'menu' }) => {
  const { menu } = appConfig || {}
  const { useMini = true } = menu || {}
  const [menuStore, dispatch] = useReducer(reducer, {
    miniMode: false,
    menuOpen: true,
    mobileMenuOpen: useMini,
    miniSwitchVisibility: true
  })
  
  const props = {
    //setters
    setMiniMode: (payload) => dispatch(setMiniMode(payload)),
    setMenuOpen: (payload) => dispatch(setMenuOpen(payload)),
    setMobileMenuOpen: (payload) => dispatch(setMobileMenuOpen(payload)),
    setMiniSwitchVisibility: (payload) => dispatch(setMiniSwitchVisibility(payload)),
    //getters
    isMiniMode: menuStore.miniMode,
    isMenuOpen: menuStore.menuOpen,
    isMobileMenuOpen: menuStore.mobileMenuOpen,
    isMiniSwitchVisibility: menuStore.miniSwitchVisibility
  }
  const [isAuthMenuOpen, setAuthMenuOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width:600px)')
  const isMenuOpenKey = `${persistKey}:menuOpen`
  const isMobileMenuOpenKey= `${persistKey}:mobileMenuOpen`
  const isMiniModeKey = `${persistKey}:miniMode`
  const isMiniSwitchVisibilityKey = `${persistKey}:miniSwitchVisibility`

  useEffect(() => {
    const persistIsMenuOpen = localStorage.getItem(isMenuOpenKey)
    const persistIsMobileMenuOpen = localStorage.getItem(isMobileMenuOpenKey)
    const persistMiniMode = localStorage.getItem(isMiniModeKey)
    const persistMiniSwitchVisibility = localStorage.getItem(isMiniSwitchVisibilityKey)

    if (persistIsMenuOpen) {
      setMenuOpen(persistIsMenuOpen === 'true')
    }
    if (persistIsMobileMenuOpen) {
      setMobileMenuOpen(persistIsMobileMenuOpen === 'true')
    }
    if (persistMiniMode) {
      setMiniMode(persistMiniMode === 'true')
    }
    if (persistMiniSwitchVisibility) {
      setMiniSwitchVisibility(persistMiniSwitchVisibility === 'true')
    }
  }, [isMenuOpenKey, isMobileMenuOpenKey, isMiniModeKey, isMiniSwitchVisibilityKey])

  useEffect(() => {
    try {
      localStorage.setItem(isMenuOpenKey, JSON.stringify(props.isMenuOpen))
    } catch (error) {
      console.warn(error)
    }
  }, [menuStore, isMenuOpenKey])

  useEffect(() => {
    try {
      localStorage.setItem(isMobileMenuOpenKey, JSON.stringify(props.isMobileMenuOpen))
    } catch (error) {
      console.warn(error)
    }
  }, [menuStore, isMobileMenuOpenKey])

  useEffect(() => {
    try {
      localStorage.setItem(isMiniModeKey, JSON.stringify(props.isMiniMode))
    } catch (error) {
      console.warn(error)
    }
  }, [menuStore, isMiniModeKey])

  useEffect(() => {
    try {
      localStorage.setItem(isMiniSwitchVisibilityKey, JSON.stringify(props.isMiniSwitchVisibility))
      if (!menuStore.miniSwitchVisibility) {
        setMiniSwitchVisibility(dispatch, menuStore.miniSwitchVisibility)
      }
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
        ...props
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
