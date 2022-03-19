import React, { useState } from 'react'

import style from './style.module.scss'

import defaultProfilePic from '../../../../svg/profile_pic.svg'
import dropdownIcon from '../../../../svg/dropdown.svg'
import dropdownIconLight from '../../../../svg/dropdown_for_light.svg'

interface props {
    isLocked: {
        isLocked: boolean
    }
    isDark: boolean
    dropdownIsOpen: boolean
    setDropdownIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Opener({ isLocked, isDark, dropdownIsOpen, setDropdownIsOpen }: props) {
    const [profilePicURL, setProfilePicURL] = useState<string>(defaultProfilePic)

    function openerOnClickOrPress() {
        isLocked.isLocked = true
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
        </div>
    )
}
