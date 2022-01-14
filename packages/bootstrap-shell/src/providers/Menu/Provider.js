import React, { useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import Context from './Context'
import {
  setIsMobileMenuOpen
} from './store/actions';
import reducer from './store/reducer';
import { SET_IS_MOBILE_MENU_OPEN } from './store/types';

const Provider = ({ appConfig, children, persistKey = 'menu' }) => {
  const { menu } = appConfig || {};
  const { initialMobileMenuOpen } = menu;
  const savedState = JSON.parse(localStorage.getItem(persistKey))
  const [menuStore, dispatch] = useReducer(reducer, {
    isMobileMenuOpen: initialMobileMenuOpen,
    ...savedState,
  });

  const props = {
    DISPATCH_ACTION(value, newValue = null) {
      if (value === SET_IS_MOBILE_MENU_OPEN) {
        dispatch(setIsMobileMenuOpen(!menuStore.isMobileMenuOpen));
      }
    },

    // getters
    isMobileMenuOpen: menuStore.isMobileMenuOpen,
  }

  useEffect(() => {
    try {
      localStorage.setItem(persistKey, JSON.stringify(menuStore))
    } catch (error) {
      console.warn(error)
    }
  }, [menuStore, persistKey])

  return (
    <Context.Provider
      value={{ ...props }}
    >
      {children}
    </Context.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.any,
}

export default Provider
