import * as React from 'react'
import { useState, useEffect } from 'react'

import getRecentlyPlayed from './getRecentlyPlayed'

import style from './recentlyPlayed.module.scss'

interface props {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    getRecentlyPlayedRef: React.MutableRefObject<() => void>
}

export default function RecentlyPlayed({ setIsLoading, getRecentlyPlayedRef }: props) {
    const [showRecentlyPlayed, setShowRecentlyPlayed] = useState<boolean>(false)
    const [recentlyPlayedData, setRecentlyPlayedData] = useState<JSX.Element[]>([])

    useEffect(() => {
        callGetRecentlyPlayed()
        getRecentlyPlayedRef.current = callGetRecentlyPlayed
    }, [])

    function callGetRecentlyPlayed() {
        getRecentlyPlayed({ setShowRecentlyPlayed, setRecentlyPlayedData, setIsLoading })
    }

    return (
        <div className={style.sectionHolder} style={{ display: !showRecentlyPlayed ? 'none' : '' }}>
            <p className={style.title}>Recently Played:</p>
            <div className={style.container}>{recentlyPlayedData}</div>
        </div>
    )
}
