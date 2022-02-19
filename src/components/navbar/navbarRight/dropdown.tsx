import React from 'react'
import { NavLink } from 'react-router-dom'
import logout from '../../../pages/other/logout'
import PrivacyButton from './privacyButton'

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
            <PrivacyButton isDark={isDark} />
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
