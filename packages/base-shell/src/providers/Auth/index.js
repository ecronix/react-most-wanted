import { useContext } from 'react'
import Context from './Context'
export { default as withAuth } from './with.js'
export { default } from './Provider.js'

export function useAuth() {
  return useContext(Context)
}
