import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
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

let dropdownIsTempLocked = false

export default function NavbarRight({ toggleTheme, isDark }: props) {
    const [profilePicURL, setProfilePicURL] = useState<string>('')
    const [isOpened, setIsOpened] = useState<boolean>(false)

    const dropdownElementRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        getProfile(setProfilePicURL)

        dropdownElementRef.current.addEventListener('click', dropdownOnClick)
        window.addEventListener('click', windowOnClick)

        return function cleanup() {
            dropdownElementRef.current.removeEventListener('click', dropdownOnClick)
            window.removeEventListener('click', windowOnClick)
        }
    }, [])

    function onClick() {
        setIsOpened(!isOpened)
        dropdownIsTempLocked = true
    }

    function onClickKeyboard(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key == 'Enter') setIsOpened(!isOpened)
        dropdownIsTempLocked = true
    }

    function dropdownOnClick() {
        dropdownIsTempLocked = true
    }

    function windowOnClick() {
        if (!dropdownIsTempLocked) {
            setIsOpened(false)
        }

        dropdownIsTempLocked = false
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
            <DropdownElement
                isDark={isDark}
                isOpened={isOpened}
                toggleTheme={toggleTheme}
                dropdownElementRef={dropdownElementRef}
            />
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
