import { useContext } from 'react'
import Context from './Context'
export { default as withMessaging } from './with.js'
export { default } from './Provider.js'

export function useMessaging() {
  return useContext(Context)
}
