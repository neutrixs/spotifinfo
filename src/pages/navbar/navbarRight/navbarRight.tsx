import * as React from 'react'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import getToken from '../../other/getToken'
import spotifyCurrentUser from '../../types/spotifyCurrentUser'

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

    useEffect(() => {
        getProfile(setProfilePicURL)
    }, [])

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

async function getProfile(setProfilePicURL: React.Dispatch<React.SetStateAction<string>>) {
    if (!localStorage.getItem('token')) {
        await getToken()
        getProfile(setProfilePicURL)
        return
    }

    const url = 'https://api.spotify.com/v1/me'

    const rawResponse = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: localStorage.getItem('token'),
        },
    })

    if (rawResponse.status == 400 || rawResponse.status == 401 || rawResponse.status == 403) {
        await getToken()
        getProfile(setProfilePicURL)
        return
    }

    const response = (await rawResponse.json()) as spotifyCurrentUser

    setProfilePicURL(response.images[0]?.url ?? '')
}
