import PropTypes from 'prop-types'
import React, { useState, useEffect, useReducer } from 'react'
import Context from './Context'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {
  setMiniMode,
  setMenuOpen,
  setMobileMenuOpen,
  setMiniSwitchVisibility,
} from './store/actions'
import reducer from './store/reducer'

const Provider = ({ appConfig, children, persistKey = 'menu' }) => {
  const { menu } = appConfig || {}
  const {
    initialMiniMode,
    initialMenuOpen,
    initialMobileMenuOpen,
    initialMiniSwitchVisibility,
    useWindowWatcher,
  } = menu

  const savedState = JSON.parse(localStorage.getItem(persistKey))

  const [menuStore, dispatch] = useReducer(reducer, {
    miniMode: initialMiniMode,
    menuOpen: initialMenuOpen,
    mobileMenuOpen: initialMobileMenuOpen,
    miniSwitchVisibility: initialMiniSwitchVisibility,
    ...savedState,
  })

  const props = {
    //setters
    setMiniMode: (payload) => dispatch(setMiniMode(payload)),
    setMenuOpen: (payload) => dispatch(setMenuOpen(payload)),
    setMobileMenuOpen: (payload) => dispatch(setMobileMenuOpen(payload)),
    setMiniSwitchVisibility: (payload) =>
      dispatch(setMiniSwitchVisibility(payload)),
    //getters
    isMiniMode: menuStore.miniMode,
    isMenuOpen: menuStore.menuOpen,
    isMobileMenuOpen: menuStore.mobileMenuOpen,
    isMiniSwitchVisibility: menuStore.miniSwitchVisibility,
  }
  const [isAuthMenuOpen, setAuthMenuOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width:600px)')

  useEffect(() => {
    try {
      localStorage.setItem(persistKey, JSON.stringify(menuStore))
    } catch (error) {
      console.warn(error)
    }
  }, [menuStore, persistKey])

  useEffect(() => {
    if (useWindowWatcher) {
      if (!isDesktop) {
        props.setMenuOpen(false)
        props.setMiniMode(false)
      }
    }
  }, [isDesktop, props, useWindowWatcher])

  return (
    <Context.Provider
      value={{
        isDesktop,
        isAuthMenuOpen,
        setAuthMenuOpen,
        ...props,
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
