import { useContext } from 'react'
import Context from './Context'
export { default as withLists } from './with.js'
export { default } from './Provider.js'

export function useLists() {
  return useContext(Context)
}
