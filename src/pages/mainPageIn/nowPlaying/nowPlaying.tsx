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
    const [nowPlayingBackgroundColour, setNowPlayingBackgroundColour] = useState<string>('')

    const element = (
        <div id="nowPlaying" style={{ backgroundColor: nowPlayingBackgroundColour }}>
            <p className="status">{nowPlayingStatus}</p>
        </div>
    )

    return showNowPlaying ? element : null
}
