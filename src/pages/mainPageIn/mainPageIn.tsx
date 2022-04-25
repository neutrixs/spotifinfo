import * as React from 'react'
import { useState, useEffect } from 'react'

import NowPlaying from './nowPlaying/nowPlaying'
import RecentlyPlayed from './recentlyPlayed/recentlyPlayed'
import Loading from '../../components/loading/loading'
import RecaptchaBadge from '../../components/recaptchaBadge/recaptchaBadge'

import { mdHandler, mdHandlerBoolean } from '../../scripts/mdHandler'
import useDimension from '../../hooks/useDimension'

import style from './mainPageIn.module.scss'

/**
 * so that it passes by reference
 */

const getRecentlyPlayedFunc: [() => void] = [function () {}]

export default function MainPageIn() {
    const [isMobile, setIsMobile] = useState(mdHandlerBoolean())
    const [isLoading, setIsLoading] = useState(true)

    const { width } = useDimension()

    useEffect(() => {
        mdHandler(setIsMobile)
    }, [width])

    return (
        <>
            {isLoading ? <Loading /> : null}
            <div className={style.mainPageIn + ' ' + (isMobile ? style.mobile : '')}>
                <NowPlaying {...{ getRecentlyPlayedFunc, isDark, isMobile, setIsLoading }} />
                <RecentlyPlayed {...{ getRecentlyPlayedFunc, setIsLoading }} />
                <RecaptchaBadge isDark={isDark} overrideStyle={{ paddingTop: '1.5em' }} />
            </div>
        </>
    )
}
