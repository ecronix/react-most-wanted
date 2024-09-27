import { useContext } from 'react'
import Context from './Context'
export { default as withDocs } from './with.js'
export { default } from './Provider.js'

export function useDocs() {
  return useContext(Context)
}
