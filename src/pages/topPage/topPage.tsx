import * as React from 'react'

interface props {
    isDark: boolean
}

enum typeSelector {
    tracks,
    artists,
}

enum rangeSelector {
    allTime,
    sixMonth,
    oneMonth,
}

export default function TopPage({ isDark }: props) {
    return (
        <div id="topPage">
            <div id="content"></div>
        </div>
    )
}

export { typeSelector, rangeSelector }
