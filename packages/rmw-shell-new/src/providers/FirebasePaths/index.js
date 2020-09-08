import { useContext } from 'react'
import Context from './Context'
export { default as withFirebasePaths } from './with.js'
export { default } from './Provider.js'

export function useFirebasePaths() {
  return useContext(Context)
}
