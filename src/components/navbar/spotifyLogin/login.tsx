import React from 'react'

import spotifyLogo from '../../../img/spotify_logo.png'
import spotifyLogoLight from '../../../img/Spotify_Icon_RGB_Black.png'

import './login.scss'

interface props {
    isDark: boolean
}

export default function Login({ isDark }: props) {
    const isForce = localStorage.getItem('force') === 'true'

    return (
        <a id="spotifyLogin" href={'/login?force=' + isForce}>
            <div className="logoHolder">
                <img src={isDark ? spotifyLogo : spotifyLogoLight} alt="Spotify Logo" />
            </div>
            <div className="textHolder">
                <span>Login</span>
            </div>
        </a>
    )
}
