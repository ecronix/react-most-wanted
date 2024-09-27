import { useContext } from 'react'
import Context from './Context'
export { default as withFilter } from './with'
export { default } from './Provider'

export function useFilter() {
  return useContext(Context)
}
