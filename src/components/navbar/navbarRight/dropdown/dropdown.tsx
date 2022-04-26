import React, { useEffect, useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ThemeContext } from '../../../../pages/store'

import PrivacyButton from './privacyButton/privacyButton'

import logout from '../../../../scripts/logout'

import style from './style.module.scss'

interface props {
    isLocked: React.MutableRefObject<boolean>
    dropdownIsOpen: boolean
    setDropdownIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Dropdown({ isLocked, dropdownIsOpen, setDropdownIsOpen }: props) {
    const [searchParams, setSearchParams] = useSearchParams()
    const { isDark } = useContext(ThemeContext)

    function dropdownOnClick() {
        isLocked.current = true
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
            <PrivacyButton />
            <div className={style.logoutButton} role="button" tabIndex={0} onClick={callLogout} onKeyPress={callLogout}>
                <span>Logout</span>
            </div>
        </div>
    )
}
