import { useContext } from 'react'
import Context, { MenuContextType } from './Context'
import Provider from './Provider'

/**
 * Custom hook to access the menu context.
 *
 * @function
 * @returns {MenuContextType} The menu context value.
 * @throws {Error} If used outside of an MenuProvider.
 * @example
 * const menuContext = useMenu()
 *
 * @description Gives you access to menu context. Provides you with set of properties and method to update those
 * properties. Possible to change properties defined in `togglerTypes` enum.
 * Provides you with properties:
 * - isDesktop: boolean
 * - isAuthMenuOpen?: boolean
 * - isMiniMode?: boolean
 * - isMenuOpen?: boolean
 * - isMobileMenuOpen?: boolean
 * - isMiniSwitchVisibility?: boolean
 *
 * @see {togglerTypes} to check possible values to change with method
 */
function useMenu(): MenuContextType {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider')
  }
  return context
}

export { useMenu, Context as MenuContext, Provider as MenuProvider }
