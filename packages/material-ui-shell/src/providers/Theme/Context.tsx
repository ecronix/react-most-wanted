import React from 'react'

export interface ThemeContextType {
  /**
   * @description Changing theme id
   * @param auth
   */
  setThemeID: (val: string) => void
  /**
   * @description Toggle dark mode ro RTL in this theme
   * @param mode - Parameter mode can be 'isRTL' or 'isDarkMode' and accordingly theme parameters will switch for that param
   */
  toggleThisTheme: (mode: 'isRTL' | 'isDarkMode') => void
  isDarkMode: boolean
  isRTL: boolean
  themeID: string
}

export const Context = React.createContext<ThemeContextType | undefined>(
  undefined
)

export default Context
