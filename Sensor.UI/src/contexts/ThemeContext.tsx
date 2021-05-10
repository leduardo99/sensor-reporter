import React, { useContext, createContext, useState, useEffect } from 'react'
import {
  ThemeProvider,
  createMuiTheme,
  ThemeOptions
} from '@material-ui/core/styles'
import { dark, light } from 'styles/themes'

interface ThemeContextData {
  theme: ThemeOptions
  toggleTheme(): void
}

const ThemeContext = createContext({} as ThemeContextData)

export const ThemesProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<ThemeOptions>(light)
  const THEME_KEY = '@theme'

  useEffect(() => {
    const themeLocal = localStorage.getItem(THEME_KEY)

    if (!themeLocal) {
      setTheme(light)
    } else {
      setTheme(themeLocal === 'light' ? light : dark)
    }
  }, [])

  const toggleTheme = () => {
    if (theme.palette?.type === 'dark') {
      localStorage.setItem(THEME_KEY, String(light.palette?.type))
      setTheme(light)
    } else {
      localStorage.setItem(THEME_KEY, String(dark.palette?.type))
      setTheme(dark)
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={createMuiTheme(theme)}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextData {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return { theme, toggleTheme }
}
