import { useContext } from 'react'
import Context from './Context'
export { default as withCols } from './with.js'
export { default } from './Provider.js'

export function useCols() {
  return useContext(Context)
}
