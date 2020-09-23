import { useContext } from 'react'
import Context from './Context'
export { default as withFilter } from './with.js'
export { default } from './Provider.js'

export function useFilter() {
  return useContext(Context)
}
