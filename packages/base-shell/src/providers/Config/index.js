import { useContext } from 'react'
import Context from './Context'
export { default as withConfig } from './with.js'
export { default } from './Provider.js'

export function useConfig() {
  return useContext(Context)
}
