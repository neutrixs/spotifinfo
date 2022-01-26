import * as React from 'react'
import { useState, useEffect } from 'react'

import getRecentlyPlayed from './getRecentlyPlayed'

import './recentlyPlayed.scss'

interface props {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    getRecentlyPlayedFunc: [() => void]
}

export default function RecentlyPlayed({ setIsLoading, getRecentlyPlayedFunc }: props) {
    const [showRecentlyPlayed, setShowRecentlyPlayed] = useState<boolean>(false)
    const [recentlyPlayedData, setRecentlyPlayedData] = useState<JSX.Element[]>([])

    useEffect(() => {
        callGetRecentlyPlayed()
        getRecentlyPlayedFunc[0] = callGetRecentlyPlayed
    }, [])

    function callGetRecentlyPlayed() {
        getRecentlyPlayed({ setShowRecentlyPlayed, setRecentlyPlayedData, setIsLoading })
    }

    return (
        <div id="recentlyPlayed" style={{ display: !showRecentlyPlayed ? 'none' : '' }}>
            <p className="title">Recently Played:</p>
            <div className="rPContainer">{recentlyPlayedData}</div>
        </div>
    )
}
