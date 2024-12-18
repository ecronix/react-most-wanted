import { useContext } from 'react'
import Context, { ThemeContextType } from './Context'
import Provider from './Provider'

/**
 * Custom hook to access the theme context.
 *
 * @function
 * @returns {ThemeContextType} The theme context value.
 * @throws {Error} If used outside of an ThemeProvider.
 * @example
 * const theme = useTheme()
 *
 * @description Gives you access to theme context. Theme context provides you with set of methods and properties that define
 * look of the App.
 * Default values are provided in application configuration file.
 */
function useTheme(): ThemeContextType {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export { useTheme, Context as ThemeContext, Provider as ThemeProvider }
