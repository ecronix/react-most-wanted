import { useContext } from 'react'
import Context from './Context'
import Provider from './Provider'

function useMenu() {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider')
  }
  return context
}

export { useMenu, Context as MenuContext, Provider as MenuProvider }
