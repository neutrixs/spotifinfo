import * as React from 'react'

interface props {
    isLoggedOut: boolean
    isDark: boolean
    toggleTheme: () => void
}

export default function Navbar({ isLoggedOut, isDark, toggleTheme }: props) {
    return (
        <nav>
            <span>abcd</span>
        </nav>
    )
}
