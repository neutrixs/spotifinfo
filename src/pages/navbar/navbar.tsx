import * as React from 'react'
import { NavLink } from 'react-router-dom'

import NavbarRight from './navbarRight/navbarRight'

import './navbar.scss'

interface props {
    isLoggedOut: boolean
    toggleTheme: () => void
    isDark: boolean
}

export default function Navbar({ isLoggedOut, toggleTheme, isDark }: props) {
    function topTracksText() {
        const element = (
            <NavLink to="/top_tracks">
                <span>Top Tracks/Artists</span>
            </NavLink>
        )

        return !isLoggedOut ? element : null
    }

    function privacyPolicyText() {
        const element = (
            <NavLink to="/privacy">
                <span>Privacy Policy</span>
            </NavLink>
        )

        return isLoggedOut ? element : null
    }

    return (
        <div id="navbar" className={!isDark ? 'light' : ''}>
            <div id="leftNavbar">
                <NavLink to="/">
                    <span>Home</span>
                </NavLink>
                {privacyPolicyText()}
                {topTracksText()}
            </div>
            {!isLoggedOut ? <NavbarRight isDark={isDark} toggleTheme={toggleTheme} /> : null}
        </div>
    )
}
