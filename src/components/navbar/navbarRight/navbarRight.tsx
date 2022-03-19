import React, { useEffect, useState } from 'react'

import ThemeSwitcher from './themeSwitcher/themeSwitcher'

import style from './style.module.scss'

interface props {
    isDark: boolean
    toggleTheme: () => void
}

/**
 * So that it passes by reference
 */

const isLocked = {
    isLocked: false,
}

export default function NavbarRight({ isDark, toggleTheme }: props) {
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false)

    useEffect(() => {
        window.addEventListener('click', windowOnClick)

        return () => {
            window.removeEventListener('click', windowOnClick)
        }
    }, [])

    function windowOnClick() {
        if (isLocked.isLocked) {
            isLocked.isLocked = false
            return
        }

        setDropdownIsOpen(false)
    }

    return (
        <div className={style.navbarRight}>
            <ThemeSwitcher isDark={isDark} toggleTheme={toggleTheme} />
        </div>
    )
}
