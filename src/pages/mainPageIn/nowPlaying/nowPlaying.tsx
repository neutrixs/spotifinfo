import * as React from 'react'
import { useState } from 'react'

import './nowPlaying.scss'

interface props {
    isDark: boolean
    isMobile: boolean
}

type nowPlayingStatus = 'Now Playing:' | 'Last Played Song' | ''

export default function NowPlaying({ isDark, isMobile }: props) {
    const [nowPlayingStatus, setNowPlayingStatus] = useState<nowPlayingStatus>('Now Playing:')
    const [showNowPlaying, setShowNowPlaying] = useState<boolean>(true) //TODO: change to false after testing done
    const [backgroundColour, setBackgroundColour] = useState<string>('')
    const [albumURL, setAlbumURL] = useState<string>('')
    const [artURL, setArtURL] = useState<string>('')
    const [songTitle, setSongTitle] = useState<string>('')

    const element = (
        <div id="nowPlaying" className={isMobile ? 'mobile ' : ''} style={{ backgroundColor: backgroundColour }}>
            <p className="status">{nowPlayingStatus}</p>
            <a id="albumArt" href={albumURL}>
                <img src={artURL} />
            </a>
        </div>
    )

    return showNowPlaying ? element : null
}
