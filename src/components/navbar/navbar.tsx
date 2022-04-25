import React, { useContext } from 'react'
import { ThemeContext, IsLoggedOutContext } from '../../pages/store'

import NavbarRight from './navbarRight/navbarRight'
import SpotifyLogin from './spotifyLogin/login'
import Navigator from './navigator/navigator'

import style from './navbar.module.scss'

export default function Navbar() {
    const { isDark } = useContext(ThemeContext)
    const isLoggedOut = useContext(IsLoggedOutContext)

    return (
        <nav className={style.nav + ' ' + (!isDark ? style.light : '')}>
            <Navigator {...{ isLoggedOut }} />
            {isLoggedOut ? <SpotifyLogin /> : <NavbarRight />}
        </nav>
    )
}
