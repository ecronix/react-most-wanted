import { useContext } from 'react'
import Context from './Context'
export { default as withLocale } from './with.js'
export { default } from './Provider.js'

export function useLocale() {
  return useContext(Context)
}
