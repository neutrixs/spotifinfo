import React from 'react'

import style from './style.module.scss'

import sunIcon from '../../../../svg/light_mode.svg'
import moonIcon from '../../../../svg/dark_mode.svg'

interface props {
    isDark: boolean
    toggleTheme: () => void
}

export default function ThemeSwitcher({ isDark, toggleTheme }: props) {
    return (
        <div
            className={style.switcher}
            role="button"
            tabIndex={0}
            onClick={() => {
                toggleTheme()
            }}
            onKeyPress={() => {
                toggleTheme()
            }}
        >
            <img src={isDark ? sunIcon : moonIcon} />
        </div>
    )
}
