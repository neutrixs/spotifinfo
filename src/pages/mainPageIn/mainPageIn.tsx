import * as React from 'react'
import { useState, useEffect } from 'react'

import { mdHandler, mdHandlerBoolean } from '../other/mdHandler'

import NowPlaying from './nowPlaying/nowPlaying'
import RecentlyPlayed from './recentlyPlayed/recentlyPlayed'
import Loading from '../../components/loading/loading'

import RecaptchaBadge from '../../components/recaptchaBadge/recaptchaBadge'

import './mainPageIn.scss'

interface props {
    isDark: boolean
}

/**
 * so that it passes by reference
 */

const getRecentlyPlayedFunc: [() => void] = [function () {}]

export default function MainPageIn({ isDark }: props) {
    const [isMobile, setIsMobile] = useState(mdHandlerBoolean())
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
                    <NowPlaying
                        isDark={isDark}
                        isMobile={isMobile}
                        setIsLoading={setIsLoading}
                        getRecentlyPlayedFunc={getRecentlyPlayedFunc}
                    />
                    <RecentlyPlayed setIsLoading={setIsLoading} getRecentlyPlayedFunc={getRecentlyPlayedFunc} />
                </div>
                <RecaptchaBadge isDark={isDark} overrideStyle={{ paddingTop: '1.5em' }} />
            </div>
        </>
    )
}
