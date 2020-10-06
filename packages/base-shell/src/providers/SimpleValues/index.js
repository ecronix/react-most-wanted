import { useContext } from 'react'
import Context from './Context'
export { default as withSimpleValues } from './with.js'
export { default } from './Provider.js'

export function useSimpleValues() {
  return useContext(Context)
}
