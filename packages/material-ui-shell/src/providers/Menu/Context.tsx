import React from 'react'

export enum togglerTypes {
  isAuthMenuOpen = 'isAuthMenuOpen',
  isMiniMode = 'isMiniMode',
  isMenuOpen = 'isMenuOpen',
  isMobileMenuOpen = 'isMobileMenuOpen',
  isMiniSwitchVisibility = 'isMiniSwitchVisibility',
}

export type MenuContextType = {
  /** Method for updating context values. Use `togglerTypes` enum to access properties. Provide new value to set to specified property */
  toggleThis: (value: togglerTypes, newValue?: boolean | null) => void
  isDesktop: boolean
  isAuthMenuOpen?: boolean
  isMiniMode?: boolean
  isMenuOpen?: boolean
  isMobileMenuOpen?: boolean
  isMiniSwitchVisibility?: boolean
}

export const Context = React.createContext<MenuContextType | undefined>(
  undefined
)

export default Context
