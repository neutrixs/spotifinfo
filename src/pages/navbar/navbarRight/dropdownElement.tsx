import * as React from 'react'
import { NavLink } from 'react-router-dom'

import logout from '../../other/logout'

import './dropdownElement.scss'

import * as checkmark from '../../../svg/check.svg'

interface props {
    isDark: boolean
    toggleTheme: () => void
}

export default function DropdownElement({ isDark, toggleTheme }: props) {
    function darkModeOnKeyPress(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key !== 'Enter') return
        toggleTheme()
    }

    return (
        <div id="dropdownElement" className={!isDark ? 'light' : ''}>
            <NavLink to="/account">
                <p>Account Page</p>
            </NavLink>
            <NavLink to="/privacy">
                <p>Privacy Policy</p>
            </NavLink>
            <p
                id="logOut"
                role="button"
                tabIndex={0}
                onClick={() => {
                    logout(true)
                }}
                onKeyPress={e => {
                    logout(true, e)
                }}
            >
                Logout
            </p>
            <div id="darkmode" role="button" tabIndex={0} onClick={toggleTheme} onKeyPress={darkModeOnKeyPress}>
                <p>Dark Mode</p>
                {isDark ? <img src={checkmark} /> : null}
            </div>
        </div>
    )
}
