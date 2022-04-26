import React, { useEffect, useState, useRef } from 'react'

import ThemeSwitcher from './themeSwitcher/themeSwitcher'
import Opener from './opener/opener'
import Dropdown from './dropdown/dropdown'

import style from './style.module.scss'

export default function NavbarRight() {
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
    const isLocked = useRef(false)

    useEffect(() => {
        window.addEventListener('click', windowOnClick)

        return () => {
            window.removeEventListener('click', windowOnClick)
        }
    }, [])

    function windowOnClick() {
        if (isLocked.current) {
            isLocked.current = false
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
