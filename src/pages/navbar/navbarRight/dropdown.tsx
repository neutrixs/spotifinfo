import React from 'react'
import { NavLink } from 'react-router-dom'
import logout from '../../other/logout'

import './dropdown.scss'

interface props {
    isShowDropdown: boolean
    isDark: boolean
    dropdownRef: React.MutableRefObject<HTMLDivElement>
}

export default function Dropdown({ isShowDropdown, isDark, dropdownRef }: props) {
    return (
        <div
            className={'dropdownElement ' + (!isDark ? 'light' : '')}
            style={{ display: !isShowDropdown ? 'none' : '' }}
            ref={dropdownRef}
        >
            <NavLink to="/privacy">
                <span>Privacy Policy</span>
            </NavLink>
            <div
                id="logoutButton"
                role="button"
                tabIndex={0}
                onClick={() => {
                    logout(true)
                }}
                onKeyPress={e => {
                    if (e.key != 'Enter') return
                    logout(true)
                }}
            >
                <span>Logout</span>
            </div>
        </div>
    )
}
