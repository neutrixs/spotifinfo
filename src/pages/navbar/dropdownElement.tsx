import * as React from 'react'
import { NavLink } from 'react-router-dom'

import './dropdownElement.scss'

interface props {
    isDark: boolean
    toggleTheme: () => void
}

export default function DropdownElement({ isDark, toggleTheme }: props) {
    return (
        <div id="dropdownElement">
            <NavLink to="/account">
                <p>Account Page</p>
            </NavLink>
            <NavLink to="/privacy">
                <p>Privacy Policy</p>
            </NavLink>
        </div>
    )
}
