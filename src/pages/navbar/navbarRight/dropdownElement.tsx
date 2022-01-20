import * as React from 'react'
import { NavLink } from 'react-router-dom'

import './dropdownElement.scss'

import * as checkmark from '../../../svg/check.svg'

interface props {
    isDark: boolean
    toggleTheme: () => void
}

export default function DropdownElement({ isDark, toggleTheme }: props) {
    return (
        <div id="dropdownElement" className={!isDark ? 'light' : ''}>
            <NavLink to="/account">
                <p>Account Page</p>
            </NavLink>
            <NavLink to="/privacy">
                <p>Privacy Policy</p>
            </NavLink>
            {
                //TODO: add logout function
            }
            <p id="logOut">Logout</p>
            <div id="darkmode" onClick={toggleTheme}>
                <p>Dark Mode</p>
                {isDark ? <img src={checkmark} /> : null}
            </div>
        </div>
    )
}
