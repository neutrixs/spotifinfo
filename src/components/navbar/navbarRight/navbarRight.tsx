import React, { useEffect, useState, useContext } from 'react'
import { ThemeContext } from '../../../pages/store'

import ThemeSwitcher from './themeSwitcher/themeSwitcher'
import Opener from './opener/opener'
import Dropdown from './dropdown/dropdown'

import style from './style.module.scss'

/**
 * So that it passes by reference
 */

const isLocked = {
    isLocked: false,
}

export default function NavbarRight() {
    const { isDark } = useContext(ThemeContext)
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
            <ThemeSwitcher />
            <Opener {...{ dropdownIsOpen, isDark, isLocked, setDropdownIsOpen }} />
            <Dropdown {...{ isDark, isLocked, dropdownIsOpen, setDropdownIsOpen }} />
        </div>
    )
}
