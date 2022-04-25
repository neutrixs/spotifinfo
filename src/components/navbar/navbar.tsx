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
    const { isDark } = useContext(ThemeContext)

    return (
        <nav className={style.nav + ' ' + (!isDark ? style.light : '')}>
            <Navigator {...{ isLoggedOut }} />
            {isLoggedOut ? <SpotifyLogin /> : <NavbarRight />}
        </nav>
    )
}
