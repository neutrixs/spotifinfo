import React from 'react'

import './navbarRight.scss'

import sunIcon from '../../../svg/light_mode.svg'
import moonIcon from '../../../svg/dark_mode.svg'

interface props {
    isDark: boolean
    toggleTheme: () => void
}

export default function NavbarRight({ isDark, toggleTheme }: props) {
    function themeSwitcherOnClick(e?: React.KeyboardEvent<HTMLDivElement>) {
        if (e && e?.key != 'Enter') return

        toggleTheme()
    }

    return (
        <div id="navbarRight">
            <div
                id="themeSwitcher"
                role="button"
                tabIndex={0}
                onClick={() => {
                    themeSwitcherOnClick()
                }}
                onKeyPress={e => {
                    themeSwitcherOnClick(e)
                }}
            >
                <img src={isDark ? sunIcon : moonIcon} />
            </div>
        </div>
    )
}
