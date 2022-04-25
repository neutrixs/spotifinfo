import React, { useContext } from 'react'
import { ThemeContext } from '../../../../pages/store'

import style from './style.module.scss'

import sunIcon from '../../../../svg/light_mode.svg'
import moonIcon from '../../../../svg/dark_mode.svg'

export default function ThemeSwitcher() {
    const { isDark, toggleTheme } = useContext(ThemeContext)

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
