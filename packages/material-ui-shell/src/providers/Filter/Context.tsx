import React from 'react'

export interface FilterContextType {}

export const Context = React.createContext<FilterContextType | undefined>(
  undefined
)

export default Context
