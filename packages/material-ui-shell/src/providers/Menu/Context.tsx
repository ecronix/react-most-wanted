import React from 'react'

export enum togglerTypes {
  isAuthMenuOpen = 'isAuthMenuOpen',
  isMiniMode = 'isMiniMode',
  isMenuOpen = 'isMenuOpen',
  isMobileMenuOpen = 'isMobileMenuOpen',
  isMiniSwitchVisibility = 'isMiniSwitchVisibility',
}

export type MenuContextType = {
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
