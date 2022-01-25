import * as React from 'react'
import { useState } from 'react'

import './recentlyPlayed.scss'

export default function RecentlyPlayed() {
    const [showRecentlyPlayed, setShowRecentlyPlayed] = useState<boolean>(true) //TODO: change to false later
    const [recentlyPlayedData, setRecentlyPlayedData] = useState<JSX.Element[]>([])

    return (
        <div id="recentlyPlayed" style={{ display: !showRecentlyPlayed ? 'none' : '' }}>
            <p className="title">Recently Played:</p>
            <div className="rPContainer">{recentlyPlayedData}</div>
        </div>
    )
}
