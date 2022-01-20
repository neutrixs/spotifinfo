import * as React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import DropdownElement from './dropdownElement'

import * as defaultProfilePic from '../../../svg/profile_pic.svg'
import * as dropdownIconForDark from '../../../svg/dropdown.svg'
import * as dropdownIconForLight from '../../../svg/dropdown_for_light.svg'

import './navbarRight.scss'

interface props {
    toggleTheme: () => void
    isDark: boolean
}

export default function NavbarRight({ toggleTheme, isDark }: props) {
    const [profilePicURL, setProfilePicURL] = useState<string>('')
    const [isOpened, setIsOpened] = useState<boolean>(false)

    function onClick() {
        setIsOpened(!isOpened)
    }

    function onClickKeyboard(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key == 'Enter') setIsOpened(!isOpened)
    }

    return (
        <div id="navbarRight">
            <div id="nonFloating" tabIndex={0} role="button" onClick={onClick} onKeyPress={onClickKeyboard}>
                <img src={profilePicURL ? profilePicURL : defaultProfilePic} />
                <img
                    src={isDark ? dropdownIconForDark : dropdownIconForLight}
                    style={{
                        transform: isOpened ? 'rotate(180deg)' : 'initial',
                    }}
                />
            </div>
            {isOpened ? <DropdownElement isDark={isDark} toggleTheme={toggleTheme} /> : null}
        </div>
    )
}
