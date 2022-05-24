import React, { useState, useRef } from 'react'
import NowPlaying from './nowPlaying/nowPlaying'
import RecentlyPlayed from './recentlyPlayed/recentlyPlayed'
import Loading from '../../components/loading/loading'
import RecaptchaBadge from '../../components/recaptchaBadge/recaptchaBadge'
import useIsMobile from '../../hooks/useIsMobile'
import style from './mainPageIn.module.scss'

export default function MainPageIn() {
    const isMobile = useIsMobile(66.5)
    const [isLoading, setIsLoading] = useState(true)

    return (
        <>
            {isLoading ? <Loading /> : null}
            <div className={style.mainPageIn + ' ' + (isMobile ? style.mobile : '')}>
                <NowPlaying {...{ setIsLoading }} />
                <RecentlyPlayed {...{ setIsLoading }} />
                <RecaptchaBadge overrideStyle={{ paddingTop: '1.5em' }} />
            </div>
        </>
    )
}
