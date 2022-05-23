import React, { useContext, useRef } from 'react'
import { ThemeContext } from '../../../pages/store'

import spotifyLogo from '../../../img/spotify_logo.png'
import spotifyLogoLight from '../../../img/Spotify_Icon_RGB_Black.png'

import style from './style.module.scss'

export default function Login() {
    const { isDark } = useContext(ThemeContext)
    const popupElement = useRef<Window | null>(null)
    const isForce = localStorage.getItem('force') === 'true'

    function loginOnClick() {
        if (popupElement.current?.closed) {
            popupElement.current = null
        }
        if (popupElement.current) return

        popupElement.current = window.open(`/login?force=${isForce}`, '', 'width=800, height=600')
    }

    return (
        <a className={style.spotifyLogin} role="button" tabIndex={0} onClick={loginOnClick} onKeyPress={loginOnClick}>
            <div className={style.logoHolder}>
                <img src={isDark ? spotifyLogo : spotifyLogoLight} alt="Spotify Logo" />
            </div>
            <div className={style.textHolder}>
                <span>Login</span>
            </div>
        </a>
    )
}
