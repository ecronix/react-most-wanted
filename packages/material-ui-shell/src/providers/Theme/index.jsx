import { useContext } from 'react'
import Context from './Context'
export { default as withTheme } from './with'
export { default } from './Provider'

export function useTheme() {
  return useContext(Context)
}
