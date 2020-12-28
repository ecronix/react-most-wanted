import { useContext } from 'react'
import Context from './Context'
export { default as withPaths } from './with.js'
export { default } from './Provider.js'

export function usePaths() {
  return useContext(Context)
}
