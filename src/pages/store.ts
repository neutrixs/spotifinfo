import { createContext } from 'react'

const themeHooks = {
    isDark: true,
    toggleTheme: () => {},
}

export const ThemeContext = createContext(themeHooks)
