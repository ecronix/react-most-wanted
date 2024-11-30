import React from 'react'
import { MenuReducerState } from './store/reducer'

export type MenuContextType = MenuReducerState & {
  isDesktop: boolean
}

export const Context = React.createContext<MenuContextType | undefined>(
  undefined
)

export default Context
