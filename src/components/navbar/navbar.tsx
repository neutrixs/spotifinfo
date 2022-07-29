import React, { useContext } from 'react'
import { ThemeContext } from '../../pages/store'
import { Navigator, NavigatorRoute } from '../navigator'
import NavbarRight from './navbarRight/navbarRight'
import SpotifyLogin from './spotifyLogin/login'
import useIsLoggedOut from '../../hooks/useIsLoggedOut'
import style from './navbar.module.scss'

export default function Navbar() {
    const { isDark } = useContext(ThemeContext)
    const isLoggedOut = useIsLoggedOut()

    const loggedOutNav = <NavigatorRoute path="/privacy">Privacy Policy</NavigatorRoute>
    const loggedInNav = (
        <>
            <NavigatorRoute path="/top_tracks">Top Tracks</NavigatorRoute>
            <NavigatorRoute path="/account">Account</NavigatorRoute>
        </>
    )

    return (
        <nav className={style.nav + ' ' + (!isDark ? style.light : '')}>
            <Navigator>
                <NavigatorRoute path="/">Home</NavigatorRoute>
                {isLoggedOut ? loggedOutNav : loggedInNav}
            </Navigator>
            {isLoggedOut ? <SpotifyLogin /> : <NavbarRight />}
        </nav>
    )
}
