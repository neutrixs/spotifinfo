import React, { useState } from 'react'

import './navbarRight.scss'

import sunIcon from '../../../svg/light_mode.svg'
import moonIcon from '../../../svg/dark_mode.svg'
import defaultProfilePic from '../../../svg/profile_pic.svg'
import dropdownIcon from '../../../svg/dropdown.svg'
import dropdownIconLight from '../../../svg/dropdown_for_light.svg'

interface props {
    isDark: boolean
    toggleTheme: () => void
}

export default function NavbarRight({ isDark, toggleTheme }: props) {
    const [profilePicURL, setProfilePicURL] = useState<string>(defaultProfilePic)
    const [dropdownOpen, setDropdownOpen] = useState(false)

    function themeSwitcherOnClick(e?: React.KeyboardEvent<HTMLDivElement>) {
        if (e && e?.key != 'Enter') return

        toggleTheme()
    }

    function dropdownOnClick(e?: React.KeyboardEvent<HTMLDivElement>) {
        if (e && e?.key != 'Enter') return

        setDropdownOpen(!dropdownOpen)
    }

    return (
        <div id="navbarRight">
            <div
                id="themeSwitcher"
                role="button"
                tabIndex={0}
                onClick={() => {
                    themeSwitcherOnClick()
                }}
                onKeyPress={e => {
                    themeSwitcherOnClick(e)
                }}
            >
                <img src={isDark ? sunIcon : moonIcon} />
            </div>
            <div className="notTheThemeSwitcher">
                <div
                    id="dropdownHolder"
                    onClick={() => {
                        dropdownOnClick()
                    }}
                    onKeyPress={e => {
                        dropdownOnClick(e)
                    }}
                >
                    <div id="profilePic">
                        <img src={profilePicURL} />
                    </div>
                    <div id="dropdown">
                        <img
                            src={isDark ? dropdownIcon : dropdownIconLight}
                            style={{ transform: dropdownOpen ? 'rotate(180deg)' : '' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
