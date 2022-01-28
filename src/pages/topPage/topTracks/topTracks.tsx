import * as React from 'react'
import { useState } from 'react'

import { typeSelector, rangeSelector } from '../topPage'

import './topTracks.scss'

interface props {
    selectedType: typeSelector
    selectedRange: rangeSelector
    targetRange: rangeSelector
}

export default function TopTracks({ selectedType, selectedRange, targetRange }: props) {
    const [data, setData] = useState<JSX.Element[]>([])

    function isShow() {
        return selectedType == typeSelector.tracks && selectedRange == targetRange
    }

    return (
        <div className="topTracksHolder" style={{ display: !isShow() ? 'none' : '' }}>
            {data}
        </div>
    )
}
