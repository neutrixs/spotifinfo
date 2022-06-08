import React, { useContext } from 'react'
import { ThemeContext, IsLoggedOutContext } from '../../pages/store'

import NavbarRight from './navbarRight/navbarRight'
import SpotifyLogin from './spotifyLogin/login'
import { Navigator, NavigatorRoute } from '../navigator'

import style from './navbar.module.scss'

export default function Navbar() {
    const { isDark } = useContext(ThemeContext)
    const isLoggedOut = useContext(IsLoggedOutContext)

    return (
        <nav className={style.nav + ' ' + (!isDark ? style.light : '')}>
            <Navigator>
                <NavigatorRoute path="/">Home</NavigatorRoute>
                <NavigatorRoute path="/top_tracks">Top Tracks</NavigatorRoute>
                <NavigatorRoute path="/account">Account</NavigatorRoute>
            </Navigator>
            {isLoggedOut ? <SpotifyLogin /> : <NavbarRight />}
        </nav>
    )
}
