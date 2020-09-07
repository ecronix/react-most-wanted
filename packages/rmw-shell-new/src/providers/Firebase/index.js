import { useContext } from 'react'
import Context from './Context'
export { default as withFirebase } from './with.js'
export { default } from './Provider.js'

export function useFirebase() {
  return useContext(Context)
}
