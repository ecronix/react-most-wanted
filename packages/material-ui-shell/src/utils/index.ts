import { createTheme } from '@mui/material/styles'

export const getThemeSource = (
  id: string,
  ts,
  isDarkMode: boolean,
  isRTL: boolean
) => {
  if (ts) {
    for (let i = 0; i < ts.length; i++) {
      if (ts[i]['id'] === id) {
        const source = ts[i]['source']
        const palette = source != null ? source.palette : {}
        return createTheme({
          ...source,
          palette: { ...palette, mode: isDarkMode ? 'dark' : 'light' },
          direction: isRTL ? 'rtl' : 'ltr',
        })
      }
    }
  }

  return createTheme({
    palette: { mode: isDarkMode ? 'dark' : 'light' },
    direction: isRTL ? 'rtl' : 'ltr',
  })
}
