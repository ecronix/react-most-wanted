import { useContext } from 'react'
import Context from './Context'
export { default as withVirtualLists } from './with.js'
export { default } from './Provider.js'

export function useVirtualLists() {
  return useContext(Context)
}
