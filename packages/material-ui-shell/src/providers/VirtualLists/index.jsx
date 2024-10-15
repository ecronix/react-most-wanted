import { useContext } from 'react'
import Context from './Context'
import Provider from './Provider'

function useVirtualLists() {
  return useContext(Context)
}

export {
  useVirtualLists,
  Context as VirtualListsContext,
  Provider as VirtualListsProvider,
}
