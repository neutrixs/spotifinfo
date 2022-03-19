import React from 'react'

import NavbarRight from './navbarRightOld/navbarRight'
import SpotifyLogin from './spotifyLogin/login'
import Navigator from './navigator/navigator'

import style from './navbar.module.scss'

interface props {
    isLoggedOut: boolean
    isDark: boolean
    toggleTheme: () => void
}

export default function Navbar({ isLoggedOut, isDark, toggleTheme }: props) {
    return (
        <nav className={style.nav + ' ' + (!isDark ? style.light : '')}>
            <Navigator isLoggedOut={isLoggedOut} isDark={isDark} />
            {isLoggedOut ? <SpotifyLogin isDark={isDark} /> : <NavbarRight isDark={isDark} toggleTheme={toggleTheme} />}
        </nav>
    )
}
