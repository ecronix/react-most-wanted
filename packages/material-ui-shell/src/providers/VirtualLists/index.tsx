import { useContext } from 'react'
import Context, { VirtualListsContextType } from './Context'
import Provider from './Provider'

/**
 * Custom hook to access virtual lists.
 *
 * @function
 * @returns {VirtualListsContextType} Virtual list context value.
 * @throws {Error} If used outside of an VirtualListsProvider.
 * @example
 * const { getOffset, setOffset } = useVirtualLists()
 *
 * @description
 * This hook provides access to the virtual lists context. It must be used withgin VirutalListsProvider.
 * It provides methods for setting and getting offset by name:
 *  - setOffset
 *  - getOffset
 *
 * @see {VirtualListsContextType} for methods reference
 */
function useVirtualLists(): VirtualListsContextType {
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
