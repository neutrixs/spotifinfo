import React from 'react'

import NavbarRight from './navbarRight/navbarRight'
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
            <Navigator {...{ isDark, isLoggedOut }} />
            {isLoggedOut ? <SpotifyLogin isDark={isDark} /> : <NavbarRight {...{ isDark, toggleTheme }} />}
        </nav>
    )
}
