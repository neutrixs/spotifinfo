import React, { useEffect, useState } from 'react'

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
            <Opener {...{ dropdownIsOpen, isLocked, setDropdownIsOpen }} />
            <Dropdown {...{ isLocked, dropdownIsOpen, setDropdownIsOpen }} />
        </div>
    )
}
