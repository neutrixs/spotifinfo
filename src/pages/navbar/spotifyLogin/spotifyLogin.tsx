import * as React from 'react'
import { useState, useEffect } from 'react'

import './spotifyLogin.scss'

import * as spotifyLogo from '../../../img/spotify_logo.png'
import * as spotifyLogoForLight from '../../../img/Spotify_Icon_RGB_Black.png'

interface props {
    isDark: boolean
}

export default function SpotifyLogin({ isDark }: props) {
    const [loginURL, setLoginURL] = useState<string>('/login')

    useEffect(() => {
        const force = localStorage.getItem('force') == 'true'
        setLoginURL(loginURL + `?force=${force.toString()}`)
    }, [])

    return (
        <a id="login" href={loginURL}>
            <img src={isDark ? spotifyLogo : spotifyLogoForLight} />
            <span>Login</span>
        </a>
    )
}
