import React, { useEffect, useReducer } from 'react'
import Context, { togglerTypes } from './Context'
import { useMediaQuery } from '@mui/material'
import {
  setIsAuthMenuOpen,
  setIsMiniMode,
  setIsMenuOpen,
  setIsMobileMenuOpen,
  setIsMiniSwitchVisibility,
} from './store/actions'
import reducer from './store/reducer'
import { IProviderProps } from '@ecronix/material-ui-shell/common.type'

const Provider: React.FC<IProviderProps> = ({
  appConfig,
  children,
  persistKey = 'menu',
}) => {
  const { menu } = appConfig || {}
  const {
    initialAuthMenuOpen,
    initialMiniMode,
    initialMenuOpen,
    initialMobileMenuOpen,
    initialMiniSwitchVisibility,
    useWindowWatcher,
  } = menu

  const pkString = localStorage.getItem(persistKey)

  const savedState = pkString !== null ? JSON.parse(pkString) : null

  const [menuStore, dispatch] = useReducer(reducer, {
    isAuthMenuOpen: initialAuthMenuOpen,
    isMiniMode: initialMiniMode,
    isMenuOpen: initialMenuOpen,
    isMobileMenuOpen: initialMobileMenuOpen,
    isMiniSwitchVisibility: initialMiniSwitchVisibility,
    ...savedState,
  })

  const props = {
    //setter
    toggleThis(value: togglerTypes, newValue: boolean | null = null) {
      if (value === togglerTypes.isAuthMenuOpen) {
        dispatch(
          setIsAuthMenuOpen(
            newValue !== null ? newValue : !menuStore.isAuthMenuOpen
          )
        )
      } else if (value === togglerTypes.isMiniMode) {
        dispatch(
          setIsMiniMode(newValue !== null ? newValue : !menuStore.isMiniMode)
        )
      } else if (value === togglerTypes.isMenuOpen) {
        dispatch(
          setIsMenuOpen(newValue !== null ? newValue : !menuStore.isMenuOpen)
        )
      } else if (value === togglerTypes.isMobileMenuOpen) {
        dispatch(
          setIsMobileMenuOpen(
            newValue !== null ? newValue : !menuStore.isMobileMenuOpen
          )
        )
      } else if (value === togglerTypes.isMiniSwitchVisibility) {
        dispatch(
          setIsMiniSwitchVisibility(
            newValue !== null ? newValue : !menuStore.isMiniSwitchVisibility
          )
        )
      }
    },
    //getters
    isAuthMenuOpen: menuStore.isAuthMenuOpen,
    isMiniMode: menuStore.isMiniMode,
    isMenuOpen: menuStore.isMenuOpen,
    isMobileMenuOpen: menuStore.isMobileMenuOpen,
    isMiniSwitchVisibility: menuStore.isMiniSwitchVisibility,
  }
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
      props.toggleThis(togglerTypes.isMiniMode, false)
      props.toggleThis(togglerTypes.isMenuOpen, isDesktop)
    }
  }, [isDesktop, useWindowWatcher])

  return (
    <Context.Provider
      value={{
        isDesktop,
        ...props,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Provider
