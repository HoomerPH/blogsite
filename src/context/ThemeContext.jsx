import { createContext, useContext } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { lightTheme, commonStyles } from '../styles/theme'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const theme = {
    ...lightTheme,
    ...commonStyles
  }

  return (
    <ThemeContext.Provider value={{}}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}