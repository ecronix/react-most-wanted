import React from 'react'

export interface VirtualListsContextType {
  /**
   * @description Set offset
   * @param name
   * @param offset
   */
  setOffset: (name: string, offset: any) => void
  /**
   * @description Toggle dark mode ro RTL in this theme
   * @param name - Get offset by name
   */
  getOffset: (name: string) => void
}

export const Context = React.createContext<VirtualListsContextType | undefined>(
  undefined
)

export default Context
