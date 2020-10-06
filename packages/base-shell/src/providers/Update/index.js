import { useContext } from 'react'
import Context from './Context'
export { default as withUpdate } from './with.js'
export { default } from './Provider.js'

export function useUpdate() {
  return useContext(Context)
}
