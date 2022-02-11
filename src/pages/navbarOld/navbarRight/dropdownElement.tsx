import * as React from 'react'
import { NavLink } from 'react-router-dom'

import logout from '../../other/logout'

import './dropdownElement.scss'

import * as checkmark from '../../../svg/check.svg'

interface props {
    isDark: boolean
    isOpened: boolean
    toggleTheme: () => void
    dropdownElementRef: React.MutableRefObject<HTMLDivElement>
}

export default function DropdownElement({ isDark, isOpened, toggleTheme, dropdownElementRef }: props) {
    function darkModeOnKeyPress(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key !== 'Enter') return
        toggleTheme()
    }

    return (
        <div
            id="dropdownElement"
            ref={dropdownElementRef}
            className={!isDark ? 'light' : ''}
            style={{ display: !isOpened ? 'none' : '' }}
        >
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
