import { createContext } from 'react'

const themeHooks = {
    isDark: true,
    toggleTheme: () => {},
}

const ThemeContext = createContext(themeHooks)

export default ThemeContext
