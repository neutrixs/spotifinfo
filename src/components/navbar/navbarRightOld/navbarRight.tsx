import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

import getToken from '../../../scripts/getToken'
import spotifyCurrentUser from '../../../types/spotifyCurrentUser'
import Dropdown from './dropdown'
import ThemeSwitcher from './themeSwitcher/themeSwitcher'

import './navbarRight.scss'

import defaultProfilePic from '../../../svg/profile_pic.svg'
import dropdownIcon from '../../../svg/dropdown.svg'
import dropdownIconLight from '../../../svg/dropdown_for_light.svg'

interface props {
    isDark: boolean
    toggleTheme: () => void
}

let dropdownLocked = false

export default function NavbarRight({ isDark, toggleTheme }: props) {
    const [profilePicURL, setProfilePicURL] = useState<string>(defaultProfilePic)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()

    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        getProfilePicURL(setProfilePicURL)

        dropdownRef.current.addEventListener('click', dropdownOnClick)
        window.addEventListener('click', windowOnClick)

        return () => {
            dropdownRef.current.removeEventListener('click', dropdownOnClick)
            window.removeEventListener('click', windowOnClick)
        }
    }, [])

    useEffect(() => {
        if (searchParams.get('dropdown') === null) return

        setDropdownOpen(true)
        searchParams.delete('dropdown')
        setSearchParams(searchParams)
    }, [searchParams])

    function dropdownHolderOnClick(e?: React.KeyboardEvent<HTMLDivElement>) {
        if (e && e?.key != 'Enter') return

        dropdownLocked = true
        setDropdownOpen(!dropdownOpen)
    }

    function dropdownOnClick() {
        dropdownLocked = true
    }

    function windowOnClick() {
        if (!dropdownLocked) setDropdownOpen(false)

        dropdownLocked = false
    }

    return (
        <div id="navbarRight">
            <ThemeSwitcher isDark={isDark} toggleTheme={toggleTheme} />
            <div className="notTheThemeSwitcher">
                <div
                    id="dropdownHolder"
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                        dropdownHolderOnClick()
                    }}
                    onKeyPress={e => {
                        dropdownHolderOnClick(e)
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
                <Dropdown isShowDropdown={dropdownOpen} isDark={isDark} dropdownRef={dropdownRef} />
            </div>
        </div>
    )
}

async function getProfilePicURL(setProfilePicURL: React.Dispatch<React.SetStateAction<string>>) {
    const rawResponse = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: localStorage.getItem('token') || '',
        },
    })

    switch (rawResponse.status) {
        case 400:
        case 401:
        case 403:
            await getToken()
            await getProfilePicURL(setProfilePicURL)
            return
    }

    const response = (await rawResponse.json()) as spotifyCurrentUser

    setProfilePicURL(response.images[0]?.url ?? defaultProfilePic)
}
