import React, { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../../../../pages/store'

import style from './style.module.scss'

import getProfilePic from './getProfilePic'

import defaultProfilePic from '../../../../svg/profile_pic.svg'
import dropdownIcon from '../../../../svg/dropdown.svg'
import dropdownIconLight from '../../../../svg/dropdown_for_light.svg'

interface props {
    isLocked: React.MutableRefObject<boolean>
    dropdownIsOpen: boolean
    setDropdownIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Opener({ isLocked, dropdownIsOpen, setDropdownIsOpen }: props) {
    const [profilePicURL, setProfilePicURL] = useState<string>(defaultProfilePic)
    const { isDark } = useContext(ThemeContext)

    useEffect(() => {
        getProfilePic(setProfilePicURL)
    }, [])

    function openerOnClickOrPress() {
        isLocked.current = true
        setDropdownIsOpen(!dropdownIsOpen)
    }

    return (
        <div
            className={style.opener}
            role="button"
            tabIndex={0}
            onClick={openerOnClickOrPress}
            onKeyPress={openerOnClickOrPress}
        >
            <div className={style.profilePic}>
                <img src={profilePicURL} />
            </div>
            <div className={style.arrow}>
                <img
                    src={isDark ? dropdownIcon : dropdownIconLight}
                    style={{ transform: dropdownIsOpen ? 'rotate(180deg)' : '' }}
                />
            </div>
        </div>
    )
}
