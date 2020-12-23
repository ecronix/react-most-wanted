import { useContext } from 'react'
import Context from './Context'
export { default as withLoader } from './with.js'
export { default } from './Provider.js'

export function useLoader() {
  return useContext(Context)
}
