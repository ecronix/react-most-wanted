import { useContext } from 'react'
import Context from './Context'
export { default as withQuestions } from './with.js'
export { default } from './Provider.js'

export function useQuestions() {
  return useContext(Context)
}
