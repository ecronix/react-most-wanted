import { useContext } from 'react'
import Context from './Context'
export { default as withVirtualLists } from './with'
export { default } from './Provider'

export function useVirtualLists() {
  return useContext(Context)
}
