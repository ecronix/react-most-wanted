import PropTypes from 'prop-types'
import React, { useState, useEffect, useReducer } from 'react'
import Context from './Context'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {
  setIsMiniMode,
  setIsMenuOpen,
  setIsMobileMenuOpen,
  setIsMiniSwitchVisibility,
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
    isMiniMode: initialMiniMode,
    isMenuOpen: initialMenuOpen,
    isMobileMenuOpen: initialMobileMenuOpen,
    isMiniSwitchVisibility: initialMiniSwitchVisibility,
    ...savedState,
  })

  const props = {
    //setters
    toggleThis(value, newValue = null){
      console.log('toggle this', value, newValue)
      if(value === 'isMiniMode'){
        dispatch(setIsMiniMode(newValue !== null ? newValue : !menuStore.isMiniMode))}
      else if(value === 'isMenuOpen'){
        dispatch(setIsMenuOpen(newValue !== null ? newValue : !menuStore.isMenuOpen))}
      else if(value === 'isMobileMenuOpen'){
        dispatch(setIsMobileMenuOpen(newValue !== null ? newValue : !menuStore.isMobileMenuOpen))}
      else if(value === 'isMiniSwitchVisibility'){
        dispatch(setIsMiniSwitchVisibility(newValue !== null ? newValue : !menuStore.isMiniSwitchVisibility))}
    },
/*     setMiniMode: (payload) => dispatch(setMiniMode(payload)),
    setMenuOpen: (payload) => dispatch(setMenuOpen(payload)),
    setMobileMenuOpen: (payload) => dispatch(setMobileMenuOpen(payload)),
    setMiniSwitchVisibility: (payload) =>
      dispatch(setMiniSwitchVisibility(payload)), */
    //getters
    isMiniMode: menuStore.isMiniMode,
    isMenuOpen: menuStore.isMenuOpen,
    isMobileMenuOpen: menuStore.isMobileMenuOpen,
    isMiniSwitchVisibility: menuStore.isMiniSwitchVisibility,
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
