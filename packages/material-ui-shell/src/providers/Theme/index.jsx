import { useContext } from 'react'
import Context from './Context'
import Provider from './Provider'

function useTheme() {
  return useContext(Context)
}

export { useTheme, Context as ThemeContext, Provider as ThemeProvider }
