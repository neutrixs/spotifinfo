import React, { useEffect, useState } from 'react'

import ThemeSwitcher from './themeSwitcher/themeSwitcher'
import Opener from './opener/opener'
import Dropdown from './dropdown/dropdown'

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
            <Opener isLocked={isLocked} isDark={isDark} dropdownIsOpen={dropdownIsOpen} setDropdownIsOpen={setDropdownIsOpen} />
            <Dropdown {...{ isDark, isLocked, dropdownIsOpen, setDropdownIsOpen }} />
        </div>
    )
}
