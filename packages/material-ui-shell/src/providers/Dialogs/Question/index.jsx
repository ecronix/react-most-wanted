import { useContext } from 'react'
import Context from './Context'
export { default as withQuestions } from './with'
export { default } from './Provider'

export function useQuestions() {
  return useContext(Context)
}
