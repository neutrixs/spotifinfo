import React, { useContext } from 'react'
import { ThemeContext } from '../../pages/store'

import NavbarRight from './navbarRight/navbarRight'
import SpotifyLogin from './spotifyLogin/login'
import Navigator from './navigator/navigator'

import style from './navbar.module.scss'

interface props {
    isLoggedOut: boolean
}

export default function Navbar({ isLoggedOut }: props) {
    const { isDark, toggleTheme } = useContext(ThemeContext)

    return (
        <nav className={style.nav + ' ' + (!isDark ? style.light : '')}>
            <Navigator {...{ isDark, isLoggedOut }} />
            {isLoggedOut ? <SpotifyLogin isDark={isDark} /> : <NavbarRight {...{ isDark, toggleTheme }} />}
        </nav>
    )
}
