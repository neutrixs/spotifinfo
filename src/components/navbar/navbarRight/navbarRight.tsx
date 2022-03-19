import React from 'react'

import ThemeSwitcher from './themeSwitcher/themeSwitcher'

import style from './style.module.scss'

interface props {
    isDark: boolean
    toggleTheme: () => void
}

export default function NavbarRight({ isDark, toggleTheme }: props) {
    return (
        <div className={style.navbarRight}>
            <ThemeSwitcher isDark={isDark} toggleTheme={toggleTheme} />
        </div>
    )
}
