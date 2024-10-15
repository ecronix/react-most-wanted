import { useContext } from 'react'
import Context from './Context'
import Provider from './Provider'

function useMenu() {
  return useContext(Context)
}

export { useMenu, Context as MenuContext, Provider as MenuProvider }
