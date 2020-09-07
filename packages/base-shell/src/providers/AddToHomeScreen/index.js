import { useContext } from 'react'
import Context from './Context'
export { default as withAddToHomeScreen } from './with.js'
export { default } from './Provider.js'

export function useAddToHomeScreen() {
  return useContext(Context)
}
