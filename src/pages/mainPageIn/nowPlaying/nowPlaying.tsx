import * as React from 'react'
import { useState } from 'react'

import './nowPlaying.scss'

interface props {
    isDark: boolean
    isMobile: boolean
}

type nowPlayingStatus = 'Now Playing:' | 'Last Played Song' | ''

export default function NowPlaying({ isDark, isMobile }: props) {
    const [nowPlayingStatus, setNowPlayingStatus] = useState<nowPlayingStatus>('')
    const [showNowPlaying, setShowNowPlaying] = useState<boolean>(false)

    const element = (
        <div id="nowPlaying">
            <p>Test</p>
        </div>
    )

    return showNowPlaying ? element : null
}
