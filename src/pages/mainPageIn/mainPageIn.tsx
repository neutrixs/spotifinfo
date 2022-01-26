import * as React from 'react'
import { useState, useEffect } from 'react'

import { mdHandler, mdHandlerBoolean } from '../other/mdHandler'

import NowPlaying from './nowPlaying/nowPlaying'
import RecentlyPlayed from './recentlyPlayed/recentlyPlayed'
import Loading from '../loading/loading'

import './mainPageIn.scss'

interface props {
    isDark: boolean
}

export default function MainPageIn({ isDark }: props) {
    const [isMobile, setIsMobile] = useState(mdHandlerBoolean())
    const [getRecentlyPlayedFunc, setGetRecentlyPlayedFunc] = useState<() => void>(function () {})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        window.addEventListener('resize', callMDHandler)

        return function cleanup() {
            window.removeEventListener('resize', callMDHandler)
        }
    }, [])

    function callMDHandler() {
        mdHandler(setIsMobile)
    }

    return (
        <>
            {isLoading ? <Loading isDark={isDark} /> : null}
            <div id="mainPageIn" className={isMobile ? 'mobile ' : ''}>
                <div className="content">
                    <NowPlaying isDark={isDark} isMobile={isMobile} setIsLoading={setIsLoading} />
                    <RecentlyPlayed setIsLoading={setIsLoading} />
                </div>
            </div>
        </>
    )
}
