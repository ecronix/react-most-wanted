import { useContext } from 'react'
import Context from './Context'
export { default as withMenu } from './with'
export { default } from './Provider'

export function useMenu() {
  return useContext(Context)
}
