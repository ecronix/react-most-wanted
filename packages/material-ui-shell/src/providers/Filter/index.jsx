import { useContext } from 'react'
import Context from './Context'
import Provider from './Provider'

function useFilter() {
  return useContext(Context)
}

export { useFilter, Context as FilterContext, Provider as FilterProvider }
