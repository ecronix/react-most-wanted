import { useContext } from 'react'
import Context, { ThemeContextType } from './Context'
import Provider from './Provider'

function useTheme(): ThemeContextType {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export { useTheme, Context as ThemeContext, Provider as ThemeProvider }
