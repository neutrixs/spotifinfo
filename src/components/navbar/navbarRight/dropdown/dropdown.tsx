import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import logout from '../../../../scripts/logout'

import style from './style.module.scss'

interface props {
    isLocked: {
        isLocked: boolean
    }
    isDark: boolean
    dropdownIsOpen: boolean
    setDropdownIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Dropdown({ isLocked, isDark, dropdownIsOpen, setDropdownIsOpen }: props) {
    const [searchParams, setSearchParams] = useSearchParams()

    function dropdownOnClick() {
        isLocked.isLocked = true
    }

    function callLogout() {
        logout(true)
    }

    useEffect(() => {
        if (searchParams.get('dropdown') === null) return

        setDropdownIsOpen(true)
        searchParams.delete('dropdown')
        setSearchParams(searchParams)
    }, [searchParams])

    return (
        <div
            className={style.dropdown + ' ' + (!isDark ? style.light : '')}
            style={{ display: !dropdownIsOpen ? 'none' : '' }}
            onClick={dropdownOnClick}
        >
            <div className={style.logoutButton} role="button" tabIndex={0} onClick={callLogout} onKeyPress={callLogout}>
                <span>Logout</span>
            </div>
        </div>
    )
}
