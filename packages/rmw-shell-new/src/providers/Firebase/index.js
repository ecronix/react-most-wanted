import { useContext } from 'react'
import Context from './Firebase/Context'
export { default as withFirebase } from './Firebase/with.js'
export { default } from './Firebase/Provider.js'

export function useFirebase() {
  return useContext(Context)
}
