import { useContext } from 'react'
import Context from './Context'
import Provider from './Provider'

function useVirtualLists() {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error(
      'useVirtualLists must be used within a VirtualListsProvider'
    )
  }
  return context
}

export {
  useVirtualLists,
  Context as VirtualListsContext,
  Provider as VirtualListsProvider,
}
