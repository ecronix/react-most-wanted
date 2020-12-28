import { useContext } from 'react'
import Context from './Context'
export { default as withStorage } from './with.js'
export { default } from './Provider.js'

export function useStorage() {
  return useContext(Context)
}
