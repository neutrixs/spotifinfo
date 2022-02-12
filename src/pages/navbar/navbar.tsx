import * as React from 'react'

import { NavLink } from 'react-router-dom'

import './navbar.scss'

interface props {
    isLoggedOut: boolean
    isDark: boolean
    toggleTheme: () => void
}

export default function Navbar({ isLoggedOut, isDark, toggleTheme }: props) {
    return (
        <nav>
            <div className="linksHolder">
                <NavLink exact to="/" className="pageLink">
                    <span>Home</span>
                </NavLink>
                <NavLink exact to="/top_tracks" className="pageLink">
                    <span>Top Tracks</span>
                </NavLink>
                <NavLink exact to="/account" className="pageLink">
                    <span>Account</span>
                </NavLink>
                <NavLink exact to="/privacy" className="pageLink">
                    <span>Privacy Policy</span>
                </NavLink>
            </div>
        </nav>
    )
}

const getWindowSizeInEM = () => window.innerWidth / parseFloat(getComputedStyle(document.body).fontSize)
