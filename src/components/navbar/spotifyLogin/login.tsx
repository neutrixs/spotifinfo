import React, { useContext } from 'react'
import { ThemeContext } from '../../../pages/store'

import spotifyLogo from '../../../img/spotify_logo.png'
import spotifyLogoLight from '../../../img/Spotify_Icon_RGB_Black.png'

import style from './style.module.scss'

export default function Login() {
    const { isDark } = useContext(ThemeContext)
    const isForce = localStorage.getItem('force') === 'true'

    return (
        <a className={style.spotifyLogin} href={'/login?force=' + isForce}>
            <div className={style.logoHolder}>
                <img src={isDark ? spotifyLogo : spotifyLogoLight} alt="Spotify Logo" />
            </div>
            <div className={style.textHolder}>
                <span>Login</span>
            </div>
        </a>
    )
}
