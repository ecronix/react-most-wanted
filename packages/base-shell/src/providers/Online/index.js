import { useContext } from 'react'
import Context from './Context'
export { default as withOnline } from './with.js'
export { default } from './Provider.js'

export function useOnline() {
  return useContext(Context)
}
