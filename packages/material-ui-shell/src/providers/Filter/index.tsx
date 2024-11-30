import { useContext } from 'react'
import Context from './Context'
import Provider from './Provider'

function useFilter() {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider')
  }
  return context
}

export { useFilter, Context as FilterContext, Provider as FilterProvider }
