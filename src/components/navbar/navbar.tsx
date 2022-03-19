import React, { useEffect, useRef, useState } from 'react'

import NavbarRight from './navbarRight/navbarRight'
import SpotifyLogin from './spotifyLogin/login'
import Navigator from './navigator/navigator'

import { NavLink } from 'react-router-dom'

import './navbar.scss'

interface props {
    isLoggedOut: boolean
    isDark: boolean
    toggleTheme: () => void
}

export default function Navbar({ isLoggedOut, isDark, toggleTheme }: props) {
    return (
        <nav className={!isDark ? 'light' : ''}>
            <Navigator isLoggedOut={isLoggedOut} isDark={isDark} />
            {isLoggedOut ? <SpotifyLogin isDark={isDark} /> : <NavbarRight isDark={isDark} toggleTheme={toggleTheme} />}
        </nav>
    )
}
